import { Container } from "inversify";
import TYPE from "./type";
import { ContactService } from "../../service/contactService";
import { ContactController } from "../../controller/contactController";

const container = new Container();

container.bind<ContactService>(TYPE.ContService).to(ContactService);
container.bind<ContactController>(TYPE.COntController).to(ContactController);

export default container;
