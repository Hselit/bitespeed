import { Container } from "inversify";
import TYPE from "./type";
import { ContactService } from "../../service/contactService";
import { ContactController } from "../../controller/contactController";
import { UserController } from "../../controller/userController";
import { UserService } from "../../service/userService";
import { AuthHandler } from "../../middleware/passport";
import { GoogleAuth } from "../../middleware/googlepass";

const container = new Container();

container.bind<ContactService>(TYPE.ContService).to(ContactService);
container.bind<ContactController>(TYPE.COntController).to(ContactController);
container.bind<UserController>(TYPE.USERCONTROLLER).to(UserController);
container.bind<UserService>(TYPE.USERSERVICE).to(UserService);
container.bind<AuthHandler>(TYPE.AUTHHANDLER).to(AuthHandler);
container.bind<GoogleAuth>(TYPE.GOOGLEAUTHHANDLER).to(GoogleAuth);

export default container;
