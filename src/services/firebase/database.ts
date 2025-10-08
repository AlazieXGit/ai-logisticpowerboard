/**
 * Firestore Database Service
 * Handles database operations and data management
 */

import { getFirestore } from './admin';
import type { DocumentData, QuerySnapshot } from 'firebase-admin/firestore';

/**
 * Create a document in a collection
 * @param collection - Collection name
 * @param docId - Document ID (optional, auto-generated if not provided)
 * @param data - Document data
 * @returns Document ID
 */
export async function createDocument(
  collection: string,
  data: DocumentData,
  docId?: string
): Promise<string> {
  try {
    const db = getFirestore();
    const collectionRef = db.collection(collection);

    if (docId) {
      await collectionRef.doc(docId).set({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docId;
    } else {
      const docRef = await collectionRef.add({
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return docRef.id;
    }
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}

/**
 * Get a document by ID
 * @param collection - Collection name
 * @param docId - Document ID
 * @returns Document data
 */
export async function getDocument(
  collection: string,
  docId: string
): Promise<DocumentData | null> {
  try {
    const db = getFirestore();
    const docRef = db.collection(collection).doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
}

/**
 * Update a document
 * @param collection - Collection name
 * @param docId - Document ID
 * @param data - Update data
 */
export async function updateDocument(
  collection: string,
  docId: string,
  data: Partial<DocumentData>
): Promise<void> {
  try {
    const db = getFirestore();
    const docRef = db.collection(collection).doc(docId);

    await docRef.update({
      ...data,
      updatedAt: new Date(),
    });

    console.log('Document updated successfully:', collection, docId);
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
}

/**
 * Delete a document
 * @param collection - Collection name
 * @param docId - Document ID
 */
export async function deleteDocument(
  collection: string,
  docId: string
): Promise<void> {
  try {
    const db = getFirestore();
    await db.collection(collection).doc(docId).delete();
    console.log('Document deleted successfully:', collection, docId);
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
}

/**
 * Query documents in a collection
 * @param collection - Collection name
 * @param field - Field to query
 * @param operator - Query operator
 * @param value - Query value
 * @returns Array of documents
 */
export async function queryDocuments(
  collection: string,
  field: string,
  operator: FirebaseFirestore.WhereFilterOp,
  value: any
): Promise<DocumentData[]> {
  try {
    const db = getFirestore();
    const querySnapshot = await db
      .collection(collection)
      .where(field, operator, value)
      .get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error querying documents:', error);
    throw error;
  }
}

/**
 * Get all documents in a collection
 * @param collection - Collection name
 * @param limit - Maximum number of documents to return
 * @returns Array of documents
 */
export async function getAllDocuments(
  collection: string,
  limit?: number
): Promise<DocumentData[]> {
  try {
    const db = getFirestore();
    let query = db.collection(collection);

    if (limit) {
      query = query.limit(limit) as any;
    }

    const querySnapshot = await query.get();

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error('Error getting all documents:', error);
    throw error;
  }
}

/**
 * Batch write operations
 * @param operations - Array of operations
 */
export async function batchWrite(
  operations: Array<{
    type: 'create' | 'update' | 'delete';
    collection: string;
    docId: string;
    data?: DocumentData;
  }>
): Promise<void> {
  try {
    const db = getFirestore();
    const batch = db.batch();

    for (const op of operations) {
      const docRef = db.collection(op.collection).doc(op.docId);

      switch (op.type) {
        case 'create':
          batch.set(docRef, {
            ...op.data,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          break;
        case 'update':
          batch.update(docRef, {
            ...op.data,
            updatedAt: new Date(),
          });
          break;
        case 'delete':
          batch.delete(docRef);
          break;
      }
    }

    await batch.commit();
    console.log('Batch write completed successfully');
  } catch (error) {
    console.error('Error in batch write:', error);
    throw error;
  }
}

/**
 * Run a transaction
 * @param updateFunction - Function to execute in transaction
 */
export async function runTransaction<T>(
  updateFunction: (transaction: FirebaseFirestore.Transaction) => Promise<T>
): Promise<T> {
  try {
    const db = getFirestore();
    return await db.runTransaction(updateFunction);
  } catch (error) {
    console.error('Error running transaction:', error);
    throw error;
  }
}

export default {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  queryDocuments,
  getAllDocuments,
  batchWrite,
  runTransaction,
};
