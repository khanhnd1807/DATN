import requestServices from "../services/requestServices";
import { CustomError } from "../middlewares/errorHandler";
import { Response, Request } from "express";
import { sendNewEmail } from "../mail/queues/email.queue";
import { detailMail } from "../mail/mailServices/detailMail";

const addRequest = async (req: Request, res: Response) => {
  await requestServices.addRequest(req.body, req.user.user_id, req.user.email);
  res.status(200).send("create successfully");
  throw new CustomError(409, "create fail");
};

const editRequest = async (req: Request, res: Response) => {
  const requests = await requestServices.editRequest(
    req.body,
    BigInt(req.params.id),
    req.user.user_id,
    req.user.email
  );
  if (requests) {
    res.status(200).send(requests);
  } else {
    throw new CustomError(404, "not found request or you not have edit it");
  }
};

const getAllRequest = async (req: Request, res: Response, next: Function) => {
  const requests = await requestServices.getAllRequestOneUser(
    BigInt(req.user.user_id)
  );
  if (!requests) {
    throw new CustomError(500, "there is a problem.");
  }
  res.status(200).send(requests.reverse());
};

const getRequestsProcessed = async (
  req: Request,
  res: Response,
  next: Function
) => {
  const requests = await requestServices.getRequestsProcessed(
    Number(req.params.status),
    req.user.email,
    req.user.role_position
  );
  if (!requests) {
    throw new CustomError(404, "not found requests");
  }
  res.status(200).send(requests.reverse());
};

const getAllMemberRequest = async (
  req: Request,
  res: Response,
  next: Function
) => {
  if (req.user.role_position == 1) {
    const requests = await requestServices.getAllRequestinDepartment(req.user);
    if (!requests) {
      throw new CustomError(500, "there is a problem.");
    }
    res.status(200).send(requests.reverse());
  } else if (req.user.role_position == 2) {
    const requests = await requestServices.getAllRequest();
    if (!requests) {
      throw new CustomError(500, "there is a problem.");
    }
    res.status(200).send(requests.reverse());
  }
};

const acceptRequest = async (req: any, res: Response, next: Function) => {
  const request = await requestServices.acceptRequest(
    req.params.id,
    req.user.email
  );
  if (!request) {
    throw new CustomError(500, "there is a problem.");
  }
  res.status(200).send(request);
  sendNewEmail(detailMail(request, "ĐỒNG Ý"));
};

const rejectRequest = async (req: any, res: Response, next: Function) => {
  const request = await requestServices.rejectRequest(
    req.params.id,
    req.user.email
  );
  if (!request) {
    throw new CustomError(500, "there is a problem.");
  }
  res.status(200).send(request);
  sendNewEmail(detailMail(request, "TỪ CHỐI"));
};

const deleteRequest = async (req: Request, res: Response, next: Function) => {
  const requests = await requestServices.deleteRequest(Number(req.params.id));
  res.status(204).send(requests);
};

const getRequest = async (req: Request, res: Response, next: Function) => {
  const request = await requestServices.getRequest(BigInt(req.params.id));
  if (!request) {
    throw new CustomError(404, "not found this request");
  }
  res.status(200).send(request);
};

const requestController = {
  addRequest,
  deleteRequest,
  editRequest,
  getAllRequest,
  rejectRequest,
  acceptRequest,
  getRequest,
  getAllMemberRequest,
  getRequestsProcessed,
};

export default requestController;
