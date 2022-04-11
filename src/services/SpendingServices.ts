import moment from "moment"
import { TABS } from "../constants/Firebase"
import { spendingRef } from "../functions/Firebase"
import { numToDay, numToMonth } from "../helpers/Generichelper"


export const createSpendingMonth = (uid: string, initialAmount: number, onSuccess: (docID: string) => void, onError: (error: string) => void) => {
  spendingRef.add({
    user_id: uid,
    amount: initialAmount,
    month: numToMonth(moment().toDate().getMonth()),
    year: moment().toDate().getFullYear(),
  }).then(docRef => {
    onSuccess(docRef.id);
  }).catch(err => {
    onError(err);
  })
}

export const checkMonthExist = (uid: string, month: string, year: number, ifExist: (docs: any) => void, ifNotExist: () => void) => {
  spendingRef
    .where("user_id", "==", uid)
    .where("month", "==", month)
    .where("year", "==", year)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        ifNotExist();
      } else {
        ifExist(snapshot.docs[0].id);
      }
    })
}

export const createSpendingTab = (uid: string, data: { amount: string, description: string }, onSuccess: (docID: string) => void, onError: (error: string) => void) => {
  const { amount, description } = data;

  checkMonthExist(
    uid,
    numToMonth(moment().toDate().getMonth())!,
    moment().toDate().getFullYear(), (docID) => {
      //if exist
      spendingRef
        .doc(docID)
        .get()
        .then(snapshot => {
          if (snapshot.data()) {
            spendingRef.doc(docID).set(
              { amount: Number(amount) + snapshot.data()!.amount },
              { merge: true }
            ).then(() => {
              spendingRef
                .doc(docID)
                .collection(TABS)
                .add({
                  amount: Number(amount),
                  description: description,
                  created_date: `${moment().toDate().getDate()}/${moment().toDate().getMonth() + 1}/${moment().toDate().getFullYear()}`,
                  created_day: numToDay(moment().toDate().getDay()),
                  created_at: moment().toDate()
                })
                .then(() => {
                  onSuccess(docID);
                })
            })
          }
        })

    }, () => {
      //if not exist
      createSpendingMonth(uid, Number(amount), (docID) => {
        spendingRef
          .doc(docID)
          .collection(TABS)
          .add({
            amount: Number(amount),
            description: description,
            created_date: `${moment().toDate().getDay()}/${moment().toDate().getMonth() + 1}/${moment().toDate().getFullYear()}`,
            created_day: numToDay(moment().toDate().getDay()),
            created_at: moment().toDate()
          })
          .then(() => {
            onSuccess(docID);
          })
      }, (err) => {
        onError(err);
      });

    })
}

export const deleteSpendingCard = (collectionID: string, tabID: string, amount: number, onSuccess: () => void, onError: (err: string) => void) => {
  spendingRef
    .doc(collectionID)
    .get()
    .then(snapshot => {
      if (snapshot.data()) {
        spendingRef
          .doc(collectionID)
          .set({
            amount: snapshot.data()!.amount - amount
          }, { merge: true })
          .then(() => {
            spendingRef.doc(collectionID).collection(TABS).doc(tabID).delete().then(() => {
              onSuccess();
            }).catch((error) => {
              onError(error);
              console.error("Error removing document: ", error);
            });
          })
      }
    })
}

