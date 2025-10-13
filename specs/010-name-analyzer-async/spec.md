# Feature Specification: Analyzer - Async Job Tracking

**Feature Branch**: `010-name-analyzer-async`  
**Created**: 2025-10-14  
**Status**: Draft  
**Input**: User description: "Add async job tracking to analyzer service: return jobId on submission, job status enum, and polling endpoints in analyzer and gateway"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

# User Scenarios & Testing (mandatory)

### User Story 1 - Submit analysis request and receive jobId (Priority: P1)

As an authenticated user I can submit an audio file or a task description to the Analyzer service and receive an immediate acknowledgement containing a jobId so I can track processing asynchronously.

**Why this priority**: This enables non-blocking uploads and lets clients provide a responsive UX while heavy analysis runs in the background.

**Independent Test**: Submit a valid audio file or task description, receive HTTP 202 with a jobId in response, then poll job status endpoint until the job reaches a terminal state.

**Acceptance Scenarios**:

1. **Given** a valid authenticated request with an audio file, **When** the request is accepted, **Then** the service returns 202 and a JSON body containing { jobId: string }.
2. **Given** a valid authenticated request with a task description, **When** the request is accepted, **Then** the service returns 202 and a JSON body containing { jobId: string }.

---

### User Story 2 - Poll job status via Gateway (Priority: P2)

As a client of the Gateway I can poll /api/analyzer/jobs/{jobId} to get the current status of a previously submitted job so I can show progress to the end user.

**Why this priority**: Gateway polling centralizes access for clients that only talk to the gateway and enforces auth/rate-limits.

**Independent Test**: Call gateway polling endpoint with an existing jobId and valid JWT; observe JSON response with jobId, status, and optional progress/metadata.

**Acceptance Scenarios**:

1. **Given** a valid jobId and authorized client, **When** the client calls the gateway polling endpoint, **Then** gateway returns 200 and job status payload.
2. **Given** an unknown jobId, **When** the client calls the polling endpoint, **Then** gateway returns 404.

---

### User Story 3 - Direct polling to Analyzer (Priority: P3)

As an internal service or advanced client I can call the Analyzer's own /jobs/{jobId} endpoint to check status directly, bypassing the gateway when appropriate.

**Why this priority**: Allows internal tooling and debugging to query Analyzer directly for richer metadata.

**Independent Test**: Call analyzer /jobs/{jobId} with proper auth and observe status payload.

**Acceptance Scenarios**:

1. **Given** a valid jobId, **When** an authorized request hits the analyzer /jobs/{jobId} endpoint, **Then** the analyzer returns 200 with the job status payload.
2. **Given** a job in processing, **When** status is requested, **Then** the service may return intermediate progress or estimated completion metadata if available.

---

### Edge Cases

- Submission of large files approaching the size limit (analyzer returns 413 and no jobId).
- Duplicate submissions of the same payload (system should create distinct jobIds but may detect duplicates optionally).
- Long-running jobs that exceed retention window (job history will be evicted after retention period; polling returns 404).
- Authorization: job status must only be visible to the submitting user or authorized service accounts.


## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: Analyzer service MUST return an opaque `jobId` (string) in the response body when an analysis request (audio or task description) is accepted for asynchronous processing. Response code: 202 Accepted.
- **FR-002**: Job records MUST include at least the following data: jobId, submitterUserId, type (audio|task), createdAt timestamp, status, optional progress (0-100) and optional resultReference (URL or id) when complete.
- **FR-003**: Define job status enum with values: QUEUED, RUNNING, SUCCESS, FAILED, CANCELLED, EXPIRED.
- **FR-004**: Analyzer service MUST expose a polling endpoint `GET /jobs/{jobId}` that returns the job record (jobId, status, createdAt, updatedAt, progress, resultReference, error message when failed).
- **FR-005**: Gateway MUST expose `GET /api/analyzer/jobs/{jobId}` which proxies/authenticates and returns the same job status payload as the analyzer service.
- **FR-006**: Job status endpoints MUST enforce authorization: only the submitter (submitterUserId) or privileged service accounts may retrieve job details.
- **FR-007**: Job records MUST persist at least for a configurable retention period (default: 7 days). After retention expiration, requests for jobId return 404.
- **FR-008**: The system MUST allow clients to cancel a job (optional): `POST /jobs/{jobId}/cancel` returning 202 if cancellation accepted, 403 if unauthorized, 404 if job not found or already terminal.

*Notes / non-functional constraints:*

- JobId must be opaque, unguessable, and safe to expose to clients.
- Progress reporting is optional: if not available, the `progress` field may be omitted.

### Key Entities *(include if feature involves data)*

- **Job**: Represents an asynchronous analysis task
  - Attributes: jobId (string), submitterUserId (string), type (audio|task), status (enum), progress (0-100, optional), resultReference (string, optional), error (string, optional), createdAt (timestamp), updatedAt (timestamp)

- **ResultReference**: Lightweight pointer to analysis result (may be a URL, storage key or internal id). Not part of this spec's implementation detail.


## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: When a valid analysis request is submitted, 100% of valid requests receive a 202 response containing a jobId within 2 seconds.
- **SC-002**: 95% of job status polls return within 500ms under normal load for cached status responses (gateway may cache transient states for efficiency).
- **SC-003**: Jobs remain queryable for the configured retention period; after retention expiry the job polling endpoint returns 404.
- **SC-004**: Unauthorized users receive 401/403 for job polling attempts; no job details are leaked to non-authorized callers.

