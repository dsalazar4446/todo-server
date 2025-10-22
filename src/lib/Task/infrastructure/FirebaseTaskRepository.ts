import { firestore } from "../../Common/infrastructure/firebase/firebaseApp";
import { DatabaseError } from "../../User/infrastructure/error/DatabaseError";
import type { ITaskRepository } from "../application/repositories/ITaskRepository";
import { Task } from "../domain";

export class FirebaseTaskRepository implements ITaskRepository {
  private collection = firestore.collection("tasks");

  async findById(id: string): Promise<Task | null> {
    try {
      const doc = await this.collection.doc(id).get();
      if (!doc.exists) return null;

      return Task.fromPrimitives({ id, ...doc.data() });
    } catch (err: any) {
      throw new DatabaseError("findById", err.message);
    }
  }

  async save(task: Task): Promise<void> {
    try {
      const data = task.toPrimitives();
      console.log('data',data);
      
      await this.collection.doc(data.id).set(data, { merge: true });
    } catch (err: any) {
      console.log(err);
      
      throw new DatabaseError("save task", err.message, err.stack);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.collection.doc(id).delete();
    } catch (err: any) {
      console.log(err);
      
      throw new DatabaseError("delete task", err.message);
    }
  }

  async findByUser(userEmail: string): Promise<Task[]> {
    
    try {
      const snapshot = await this.collection
        .where("userEmail", "==", userEmail)
        .get();
      return snapshot.docs.map((doc) =>
        Task.fromPrimitives({ id: doc.id, ...doc.data() })
      );
    } catch (err: any) {
      console.log(err);
      
      throw new DatabaseError("findByUser", err.message);
    }
  }

  async listCompleted(userEmail: string): Promise<Task[]> {
    try {
      const snapshot = await this.collection
        .where("userEmail", "==", userEmail)
        .where("status", "==", "completed")
        .get();

      return snapshot.docs.map((doc) =>
        Task.fromPrimitives({ id: doc.id, ...doc.data() })
      );
    } catch (err: any) {
      console.log(err);
      
      throw new DatabaseError("listCompleted", err.message);
    }
  }

  async listPending(userEmail: string): Promise<Task[]> {
    try {
      const snapshot = await this.collection
        .where("userEmail", "==", userEmail)
        .where("status", "==", "pending")
        .get();

      return snapshot.docs.map((doc) =>
        Task.fromPrimitives({ id: doc.id, ...doc.data() })
      );
    } catch (err: any) {
      throw new DatabaseError("listPending", err.message);
    }
  }
}
