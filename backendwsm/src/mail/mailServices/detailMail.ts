import RequestAttributes from "../../interfaces/request"

export const detailMail = (request: RequestAttributes, keyword: string) => {
    return {
        email: request.email_user,
        leader: request.email_leader,
        detail: request.detail,
        time_start: request.time_start,
        time_end: request.time_end,
        keyword: keyword,
        description: request.description,
        request_id: request.request_id
    }
}