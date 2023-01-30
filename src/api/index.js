import { doc, collection, addDoc, getDocs, runTransaction } from "firebase/firestore";
import db from "./firebase";

const COLLECTION = "tasks";

export const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION));

  return new Promise((resolve, reject) => {
    if (!querySnapshot.empty) {
      const tasks = querySnapshot.docs.map(item => {
        return {
          id: item.id,
          data: item.data()
        }
      });

      resolve({
        status: 200,
        data: tasks
      })
    } else {
      reject({
        status: 400,
        message: 'empty collection'
      })
    }
  })
}

export const addData = async (payload) => {
  const docRef = collection(db, COLLECTION);

  const newTask = await addDoc(docRef, payload);

  return new Promise((resolve, reject) => {
    if (newTask.id) {
      resolve({
        status: 200,
        data: newTask
      })
    } else {
      reject({
        status: 400,
        message: ''
      })
    }
  })
}

// docs about transaction process: https://firebase.google.com/docs/firestore/manage-data/transactions?hl=en&authuser=0

const handleTransaction = async (id, changes) => {
  try {
    return await runTransaction(db, async (transaction) => {
      const docRef = doc(db, COLLECTION, id);

      const getDoc = await transaction.get(docRef);

      // if not found, then throw error
      if (!getDoc.exists()) {
        throw "document does not exist";
      }

      const lastUpdate = transaction.update(docRef, changes);

      return new Promise((resolve, reject) => {
        lastUpdate._transaction.writtenDocs.size > 0 ?
          resolve({ status: 200 })
          :
          reject({ status: 400 })
      });
    });
  } catch (e) {
    console.error('woops. something went wrong', e);
  }
}

export const updateData = async (payload) => {
  const { id, data } = payload;

  const lastTransaction = await handleTransaction(id, { title: data.title });

  return new Promise((resolve, reject) => {
    // make sure if transaction.update is success
    if (lastTransaction.status === 200) {
      resolve({
        status: 200,
        data: payload
      })
    } else {
      reject({
        status: 400,
        message: 'update failed'
      })
    }
  })
}

export const markDoneData = async (payload) => {
  const { id, data } = payload;

  const lastTransaction = await handleTransaction(id, { isDone: true });

  return new Promise((resolve, reject) => {
    // make sure if transaction.update is success
    if (lastTransaction.status === 200) {
      resolve({
        status: 200,
        data: payload
      })
    } else {
      reject({
        status: 400,
        message: 'mark done failed'
      })
    }
  })
}

export const deleteData = async (payload) => {
  const { id } = payload;

  const lastTransaction = await handleTransaction(id, { isDeleted: true });

  return new Promise((resolve, reject) => {
    // make sure if transaction.update is success
    if (lastTransaction.status === 200) {
      resolve({
        status: 200,
        data: payload
      })
    } else {
      reject({
        status: 400,
        message: 'delete failed'
      })
    }
  })
} 