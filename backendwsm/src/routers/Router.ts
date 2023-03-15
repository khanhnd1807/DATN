import express from "express";
import { errorHandler, CustomError } from "../middlewares/errorHandler";
import userController from "../controllers/userController";
import departmentControllers from "../controllers/departmentController";
import validate from "../middlewares/validate";
import { uploadController } from "../controllers/uploadController";
import path from "path";
import { validationResult } from "express-validator";
import { verifyToken } from "../middlewares/verifyToken";
import timeKeepingController from "../controllers/timeKeepingController";
import {
  verifyRole,
  verifyRoleAdmin,
  verifyToAcceptRequest,
} from "../middlewares/verifyRole";
import requestController from "../controllers/requestController";
import { Response, Request } from "express";

const initWebRoute = (app: any) => {
  /**
   * @swagger
   * /login:
   *   post:
   *     summary: login
   *     consumes:
   *        - application/json
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *         schema:
   *          type: object
   *          properties:
   *            email:
   *              type: string
   *              example: admin@zinza.com.vn
   *            password:
   *              type: string
   *              example: 12345
   *     responses:
   *       404:
   *         description: not found this account
   *       200:
   *         description: login successfully
   */
  app.post(
    "/login",
    validate.validateEmail(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      await userController.Login(req, res, next);
    }
  );

  /**
   * @swagger
   * /logout:
   *   get:
   *     summary: logout
   *     tags: [User]
   *     responses:
   *       404:
   *         description: not found this account
   *       200:
   *         description: login successfully
   */
  app.get("/logout", verifyToken, userController.logout);

  /**
   * @swagger
   * /profile:
   *  get:
   *   summary: get info myself
   *   tags: [User]
   *   content:
   *    application/json:
   *   schema:
   *    type: object
   *   responses:
   *     404:
   *       description: not found account
   *     422:
   *       description: not permission
   *     200:
   *       description: successfully
   */
  app.get("/profile", verifyToken, userController.getInfoUser);

  /**
   * @swagger
   * /profile:
   *   put:
   *     summary: edit info myself
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *         schema:
   *          type: object
   *          properties:
   *            firstname:
   *               type: string
   *               example:
   *            lastname:
   *                type: string
   *                example:
   *            avatar:
   *                type: string
   *                example:
   *            gender:
   *                type: boolean
   *                example: true
   *            birthday:
   *                type: date
   *                example: 2022-11-07T00:00:00.000Z
   *            phone_number:
   *                 type: string
   *                 example: 08637478824
   *            address:
   *                  type: string
   *                  example: Nam Định
   *     responses:
   *       404:
   *         description: not found this account
   *       200:
   *         description: login successfully
   */
  app.put(
    "/profile",
    verifyToken,
    validate.validateEditProfile(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      await userController.updateInfoUser(req, res, next);
    }
  );

  //member

  /**
   * @swagger
   * /members:
   *   get:
   *     summary: only admin can get all members
   *     tags: [Member]
   *     schema:
   *       type: array
   *     responses:
   *       200:
   *         description: get All Members successfully
   */
  app.get("/members", verifyToken, verifyRoleAdmin, userController.getAllUser);

  /**
   * @swagger
   * /members/{id}:
   *   get:
   *     summary: only admin can get info a members
   *     tags: [Member]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *           required: true
   *     responses:
   *       200:
   *         description: get All Members successfully
   *       404:
   *         description: not found member
   */
  app.get(
    "/members/:id",
    verifyToken,
    verifyRoleAdmin,
    userController.getInfoMember
  );

  /**
   * @swagger
   * /members/{id}/edit:
   *   put:
   *     summary: only admin can edit infomation of user
   *     tags: [Member]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: member id
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *              schema:
   *                   type: object
   *                   properties:
   *                     firstname:
   *                         type: string
   *                         example:
   *                     lastname:
   *                         type: string
   *                         example:
   *                     avatar:
   *                         type: string
   *                         example:
   *                     gender:
   *                         type: boolean
   *                         example: true
   *                     birthday:
   *                         type: date
   *                         example: 2022-11-07T00:00:00.000Z
   *                     phone_number:
   *                         type: string
   *                         example: 08637478824
   *                     address:
   *                         type: string
   *                         example: Nam Định
   *                     becoming_offcial_employee:
   *                         type: date
   *                         example: null
   *                     join_company:
   *                         type: date
   *                         example: 2022-11-07T00:00:00.000Z
   *                     department_id:
   *                         type: bigint
   *                         example:
   *                     holidays:
   *                         type: number
   *                         example: 0
   *     responses:
   *        200:
   *         description: edit info  Members successfully
   *        403:
   *          description: you not have permission
   *        404:
   *          description: cannot find member
   */
  app.put(
    "/members/:id/edit",
    verifyToken,
    verifyRoleAdmin,
    validate.validateEditMember(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      await userController.updateInfoMember(req, res, next);
    }
  );

  /**
   * @swagger
   * /members/{id}/delete:
   *   delete:
   *     summary: only admin can edit infomation of user
   *     tags: [Member]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: member id
   *     responses:
   *        200:
   *         description: delete successfully
   *        403:
   *          description: you cannot delete
   *        404:
   *          description: cannot find member
   */
  app.delete(
    "/members/:id/delete",
    verifyToken,
    verifyRoleAdmin,
    userController.deleteUser
  );

  /**
   * @swagger
   * /members/members-department/{derpartment_id}:
   *   get:
   *     summary: only admin and lead can get members in adepartment
   *     tags: [Member]
   *     parameters:
   *       - in: path
   *         name: derpartment_id
   *         schema:
   *           type: string
   *         required: true
   *         description: department id
   *     responses:
   *        200:
   *         description: get members successfully
   *        403:
   *          description: you not have permision
   */
  app.get(
    "/members/members-department/:derpartment_id",
    verifyToken,
    verifyRole,
    userController.getAllUserInDepartment
  );

  /**
   * @swagger
   * /signup:
   *   post:
   *     summary: only admin can create a member
   *     tags: [Member]
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *              schema:
   *                   type: object
   *                   properties:
   *                     email:
   *                         type: string
   *                         example:
   *                     firstname:
   *                         type: string
   *                         example:
   *                     lastname:
   *                         type: string
   *                         example:
   *                     avatar:
   *                         type: string
   *                         example:
   *                     gender:
   *                         type: boolean
   *                         example: true
   *                     birthday:
   *                         type: date
   *                         example: 2022-11-07T00:00:00.000Z
   *                     phone_number:
   *                         type: string
   *                         example: 08637478824
   *                     address:
   *                         type: string
   *                         example:
   *                     password:
   *                         type: string
   *                         example:
   *                     becoming_offcial_employee:
   *                         type: date
   *                         example: null
   *                     join_company:
   *                         type: date
   *                         example: 2022-11-07T00:00:00.000Z
   *                     department_id:
   *                         type: bigint
   *                         example:
   *                     holidays:
   *                         type: number
   *                         example: 0
   *     responses:
   *        200:
   *         description: create Members successfully
   *        403:
   *          description: you not have permission
   *        404:
   *          description: not found
   */
  app.post(
    "/signup",
    verifyToken,
    verifyRoleAdmin,
    validate.validateCreateUser(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      await userController.SignUp(req, res, next);
    }
  );

  //upload
  //static path for save image
  app.get(
    "/uploads/images",
    express.static(path.join(__dirname, "..", "uploads", "images"))
  );

  /**
   * @swagger
   *   /upload-files:
   *      post:
   *          tags:
   *             - Upload
   *          summary: Upload Video/Image for Inferring
   *          producers:
   *             - image/*
   *          requestBody:
   *             content:
   *                multipart/form-data:
   *                  schema:
   *                     type: object
   *                     properties:
   *                        avatar:
   *                          type: string
   *                          format: binary
   *          responses:
   *             200:
   *               description: Successful Response
   *             405:
   *               description: avatar invalid
   *             500:
   *               description: Internal Server Error
   */
  app.post("/upload-files", uploadController);

  // router departments

  /**
   * @swagger
   * /departments:
   *   get:
   *     summary: only admin can get departments
   *     tags: [Department]
   *     responses:
   *        200:
   *         description: get department successfully
   *        403:
   *          description: you not have permision
   */
  app.get(
    "/departments",
    verifyToken,
    verifyRoleAdmin,
    departmentControllers.getListDepartment
  );

  /**
   * @swagger
   * /deparments/{id}:
   *   get:
   *     summary: only admin can get info a department
   *     tags: [Department]
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: department id
   *     responses:
   *        200:
   *         description: get department successfully
   *        403:
   *          description: you not have permision
   *        404:
   *          description: not found
   */
  app.get(
    "/deparments/:id",
    verifyToken,
    verifyRoleAdmin,
    departmentControllers.getDepartment
  );

  /**
   * @swagger
   * /departments:
   *   post:
   *     summary: only admin can add department
   *     consumes:
   *        - application/json
   *     tags: [Department]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *         schema:
   *          type: object
   *          properties:
   *            name:
   *              type: string
   *              example: division 4
   *            sign:
   *              type: string
   *              example: D1
   *
   *     responses:
   *       403:
   *         description: you not have permission
   *       200:
   *         description: add department successfully
   *       405:
   *         description: name or sign is exist
   *       404:
   *         description: cannot set leader for department
   */
  app.post(
    "/departments",
    verifyToken,
    verifyRoleAdmin,
    validate.validateDepartment(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      {
        await departmentControllers.addDepartment(req, res, next);
      }
    }
  );

  /**
   * @swagger
   * /departments/{department_id}/edit:
   *   put:
   *     summary: only admin can edit infomation of user
   *     tags: [Department]
   *     parameters:
   *       - in: path
   *         name: department_id
   *         schema:
   *           type: string
   *         required: true
   *         description: department id
   *     requestBody:
   *         required: true
   *         content:
   *           application/json:
   *              schema:
   *                   type: object
   *                   properties:
   *                     name:
   *                         type: string
   *                         example:
   *                     sign:
   *                         type: string
   *                         example:
   *                     lead:
   *                         type: bigint
   *                         example: 0
   *     responses:
   *        200:
   *          description: edit department successfully
   *        403:
   *          description: you not have permission
   *        404:
   *          description: cannot find department or cannot find member in department
   *        405:
   *         description: name or sign is exist
   */
  app.put(
    "/departments/:department_id/edit",
    verifyToken,
    verifyRoleAdmin,
    validate.validateEditDepartment(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      {
        await departmentControllers.updateDepartment(req, res, next);
      }
    }
  );

  /**
   * @swagger
   * /departments/{department_id}/delete:
   *   delete:
   *     summary: only admin can edit infomation of user
   *     tags: [Department]
   *     parameters:
   *       - in: path
   *         name: department_id
   *         schema:
   *           type: string
   *         required: true
   *         description: department id
   *     responses:
   *        200:
   *          description: delete department successfully
   *        403:
   *          description: you not have permission
   *        404:
   *          description: cannot find department
   *        405:
   *          description: cannot delete department
   */
  app.delete(
    "/departments/:department_id/delete",
    verifyToken,
    verifyRoleAdmin,
    departmentControllers.deleteDepartment
  );

  // router request

  /**
   * @swagger
   * /requests:
   *   post:
   *     summary: create a request
   *     consumes:
   *        - application/json
   *     tags: [Request]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *         schema:
   *          type: object
   *          properties:
   *            detail:
   *              type: string
   *              example:
   *            phone_number:
   *              type: string
   *              example:
   *            time_start:
   *              type: date-time
   *              example: 2022-11-07T00:00:00.000Z
   *            time_end:
   *              type: date-time
   *              example: 2022-11-07T00:00:00.000Z
   *            description:
   *              type: string
   *              example:
   *              description: this is description reson of request
   *     responses:
   *       200:
   *         description: create request successfully
   *       422:
   *         description: error  validate
   *       404:
   *         description: cannot set leader for department
   */
  app.post(
    "/requests",
    verifyToken,
    validate.validateRequest(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      {
        await requestController.addRequest(req, res);
      }
    }
  );

  /**
   * @swagger
   * /requests:
   *   get:
   *     summary: get all requets myself
   *     tags: [Request]
   *     responses:
   *        200:
   *         description: get request successfully
   */
  app.get("/requests", verifyToken, requestController.getAllRequest);

  /**
   * @swagger
   * /requests/{id}:
   *   get:
   *      summary: get detail a request
   *      tags: [Request]
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *               type: string
   *               required: true
   *               description: member id
   *      responses:
   *        200:
   *         description: get request successfully
   *        404:
   *          description: not found request
   */
  app.get("/requests/:id", verifyToken, requestController.getRequest);

  // app.delete("/requests/:id", verifyToken, requestController.deleteRequest);

  /**
   * @swagger
   * /requests/{id}:
   *   put:
   *      summary: edit a request myself when it is not processed
   *      tags: [Request]
   *      parameters:
   *          - in: path
   *            name: id
   *            schema:
   *               type: string
   *               required: true
   *               description: member id
   *      requestBody:
   *       required: true
   *       content:
   *        application/json:
   *         schema:
   *          type: object
   *          properties:
   *            detail:
   *              type: string
   *              example:
   *            phone_number:
   *              type: string
   *              example:
   *            time_start:
   *              type: date-time
   *              example: 2022-11-07T00:00:00.000Z
   *            time_end:
   *              type: date-time
   *              example: 2022-11-07T00:00:00.000Z
   *            description:
   *              type: string
   *              example:
   *              description: this is description reson of request
   *      responses:
   *        200:
   *         description: get request successfully
   *        404:
   *          description: not found request
   *        422:
   *          description: validate error
   */
  app.put(
    "/requests/:id",
    verifyToken,
    validate.validateRequest(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      {
        await requestController.editRequest(req, res);
      }
    }
  );

  /**
   * @swagger
   * /requests/{id}/accept:
   *   put:
   *       summary: only admin or leader can accept request
   *       tags: [Request]
   *       parameters:
   *          - in: path
   *            name: id
   *            schema:
   *               type: string
   *               required: true
   *               description: request id
   *       responses:
   *             200:
   *                description: get request successfully
   *             404:
   *                description: not found request or this request has been processed
   *             422:
   *                description: validate error
   */
  app.put(
    "/requests/:id/accept",
    verifyToken,
    verifyToAcceptRequest,
    requestController.acceptRequest
  );

  /**
   * @swagger
   * /requests/requests-processed/{status}:
   *   get:
   *      summary: only admin or leader can get processed requests, admin can get all processed request, but leader only get all processed requests that he has processed
   *      tags: [Request]
   *      parameters:
   *          - in: path
   *            name: status
   *            schema:
   *               type: string
   *               enum: [1,2]
   *               required: true
   *               description: status
   *      responses:
   *        200:
   *         description: get request successfully
   *        403:
   *          description: you not have permission
   *        422:
   *          description: validation error
   */
  app.get(
    "/requests/requests-processed/:status",
    verifyToken,
    verifyRole,
    validate.validateGetProcessedRequests(),
    async (req: Request, res: Response, next: Function) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new CustomError(422, validate.getMessageError(errors));
      }
      await requestController.getRequestsProcessed(req, res, next);
    }
  );

  /**
   * @swagger
   * /requests-member:
   *   get:
   *      summary: only admin or leader get unprocessed requests of member, admin can get all unprocessed request, but lead can only can get all unprocessed request of members in his department
   *      tags: [Request]
   *      responses:
   *        200:
   *         description: get request successfully
   *        403:
   *          description: you not have permission
   *        404:
   *          description: not found
   */
  app.get(
    "/requests-member",
    verifyToken,
    verifyRole,
    requestController.getAllMemberRequest
  );

  /**
   * @swagger
   * /requests/{id}/reject:
   *   put:
   *       summary: only admin or leader can accept request
   *       tags: [Request]
   *       parameters:
   *          - in: path
   *            name: id
   *            schema:
   *               type: string
   *               required: true
   *               description: request id
   *       responses:
   *             200:
   *                description: get request successfully
   *             404:
   *                description: not found request or this request has been processed
   *             422:
   *                description: validate error
   */
  app.put(
    "/requests/:id/reject",
    verifyToken,
    verifyToAcceptRequest,
    requestController.rejectRequest
  );

  //router timekeeping

  /**
   * @swagger
   * /time-keepings/check-in:
   *   post:
   *       summary: create timekeeping and checkin when this API is called, everyday only can create a timekeeping
   *       tags: [Timkeeping]
   *       responses:
   *             200:
   *                description: check in successfully
   *             409:
   *                description: create timekeeping fail
   */
  app.post(
    "/time-keepings/check-in",
    verifyToken,
    timeKeepingController.checkIn
  );

  /**
   * @swagger
   * /time-keepings/check-out:
   *   put:
   *       summary: update field checkout of timeKeeping exist, if it has been checked out, you cannot check out again
   *       tags: [Timkeeping]
   *       responses:
   *             200:
   *                description: check out successfully
   *             404:
   *                description: not found timekeeping
   */
  app.put(
    "/time-keepings/check-out",
    verifyToken,
    timeKeepingController.check_out
  );

  /**
   * @swagger
   * /time-keepings:
   *   get:
   *       summary: get all timekeeping myself
   *       tags: [Timkeeping]
   *       responses:
   *             200:
   *                description: get time-keepings successfully
   *             404:
   *                description: not found timekeeping
   */
  app.get(
    "/time-keepings",
    verifyToken,
    timeKeepingController.getAllTimeKeeping
  );

  /**
   * @swagger
   * /time-keeping:
   *   get:
   *       summary: check status checkin  or checkout of timekeeping today to display button checkin, checkout, 0 - not check in, 1 - checked in, 2 - checked out
   *       tags: [Timkeeping]
   *       responses:
   *             200:
   *                description: get status successfully
   *             404:
   *                description: not found timekeeping
   */
  app.get("/time-keeping", verifyToken, timeKeepingController.getTimeKeeping);
  app.use(errorHandler);
};
export default initWebRoute;
