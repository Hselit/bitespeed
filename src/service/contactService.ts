import { injectable } from "inversify";
import { prisma } from "../utils/prisma";

@injectable()
export class ContactService {
  async getContact(data: any) {
    try {
      if (!data.email && !data.phoneNumber) {
        console.log("in no data");
        return "Provide at least email or phoneNumber";
      }
      const emailList: string[] = [];
      const phoneList: string[] = [];
      const secIdList: number[] = [];
      let primaryId: number | null = null;
      const result = await prisma.contact.findMany({
        where: {
          OR: [{ email: data?.email || undefined }, { phoneNumber: data?.phoneNumber || undefined }],
        },
      });

      result.forEach((contact) => {
        if (!contact.email?.includes(data.email) && contact.email) {
          emailList.push(contact.email);
        }
        if (!contact.phoneNumber?.includes(data.phoneNumber) && contact.phoneNumber) {
          phoneList.push(contact.phoneNumber);
        }
        if (contact.linkPrecedence == "primary" && primaryId == null) {
          primaryId = contact.id;
        }
        if (contact.linkPrecedence == "secondary") {
          secIdList.push(contact.id);
        }
      });
      return {
        contact: {
          primaryContatctId: primaryId,
          emails: emailList,
          phoneNumbers: phoneList,
          secondaryContactIds: secIdList,
        },
      };
      console.log(result);
    } catch (error) {
      throw error;
    }
  }
}
