import type { IUserRepository } from "../application/repositories/IUserRepository";
import { User } from "../domain";
import { DatabaseError } from "./error/DatabaseError";
import { firestore } from "../../Common/infrastructure/firebase/firebaseApp";


export class FirebaseUserRepository implements IUserRepository {
  private readonly collection = firestore.collection("users");

  async findByEmail(email: string): Promise<User | null> {
    try {
      
      const snapshot = await this.collection
        .where("email", "==", email)
        .limit(1)
        .get();

      if (snapshot.empty) return null;
  
      const doc = snapshot.docs[0];
      return User.create(doc?.data().email, doc?.id, doc?.data().createdAt);
    } catch (err: any) {
      console.log(err);
      
      throw new DatabaseError("findByEmail", err.message);

    }
  }

  async save(user: User): Promise<void> {
    try {
      const data = user.toPrimitives();
      await this.collection.doc(data.id).set(data);
    }
    catch (err: any) {
      throw new DatabaseError("save user", err.message);
    }
  }
  async delete(email: string): Promise<void> {
    try {
      const snapshot = await this.collection
        .where("email", "==", email)
        .limit(1)
        .get();
      if (snapshot.empty) return;

      const doc = snapshot.docs[0];
      await this.collection.doc(doc.id).delete();
    } catch (err: any) {
      throw new DatabaseError("delete user", err.message);
    }
  }
}
