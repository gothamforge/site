import {Client, Databases} from 'appwrite';

const init = (client:Client) => {
  let db = new Databases(client);

  return {
    contactus: {
      create: async (name:string, email:string, message:string) => 
        db.createDocument('gothamforge', 'contactus', 'unique()', {name, email, message}),
    }
  }
}

export default init;