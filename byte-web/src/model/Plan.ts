import firebase from "../firebase";
import {Meal} from "./Meal";

export interface Plan {
  firebaseRef: firebase.firestore.DocumentReference;
  name: string;
  meals: [Meal];
}

export function planFromSnapshot(snapshot: firebase.firestore.DocumentSnapshot): Plan {
  const data = snapshot.data();
  if (data) {
    const meals = data.meals || [];
    return {
      firebaseRef: snapshot.ref,
      name: data.name,
      meals: meals
    };
  } else {
    throw new Error("Where's the data mate?");
  }
}

export function savePlan(plan: Plan) {
  const planData = {...plan};
  delete planData.firebaseRef;
  plan.firebaseRef.set(planData);
}

export function plansForUser(userId: string): firebase.firestore.CollectionReference {
  return firebase.firestore().collection("users").doc(userId).collection("plans");
}
