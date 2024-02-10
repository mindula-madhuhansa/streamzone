// import React, { useEffect, useState } from "react";
// import "./PlanScreen.css";
// import { db } from "../firebase";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   onSnapshot,
//   doc,
//   addDoc,
// } from "firebase/firestore";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/userSlice";
// import { loadStripe } from "@stripe/stripe-js";

// function PlanScreen() {
//   const [products, setProducts] = useState([]);
//   const [subscription, setSubscription] = useState(null);
//   const user = useSelector(selectUser);

//   useEffect(() => {
//     const fetchSubscriptions = async () => {
//       try {
//         const subscriptionsRef = collection(
//           doc(db, "customers", user.uid),
//           "subscriptions"
//         );
//         const querySnapshot = await getDocs(subscriptionsRef);
//         querySnapshot.forEach((subscriptionDoc) => {
//           setSubscription({
//             role: subscriptionDoc.data().role,
//             current_period_end:
//               subscriptionDoc.data().current_period_end.seconds,
//             current_period_start:
//               subscriptionDoc.data().current_period_start.seconds,
//           });
//         });
//       } catch (error) {
//         console.error("Error fetching subscriptions:", error);
//       }
//     };

//     if (user && user.uid) {
//       fetchSubscriptions();
//     }
//   }, [user]);

//   console.log(setSubscription);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const productsRef = collection(db, "products");
//       const q = query(productsRef, where("active", "==", true));
//       const querySnapshot = await getDocs(q);

//       const fetchedProducts = {};
//       querySnapshot.forEach(async (productDoc) => {
//         fetchedProducts[productDoc.id] = productDoc.data();
//         const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
//         priceSnap.forEach((price) => {
//           fetchedProducts[productDoc.id].prices = {
//             priceId: price.id,
//             priceData: price.data(),
//           };
//         });
//       });

//       setProducts(fetchedProducts);
//     };

//     fetchProducts();
//   }, []);

//   const loadCheckout = async (priceId) => {
//     try {
//       const checkoutSessionRef = await addDoc(
//         collection(doc(db, "customers", user.uid), "checkout_sessions"),
//         {
//           price: priceId,
//           success_url: window.location.origin,
//           error_url: window.location.origin,
//         }
//       );

//       const unsubscribe = onSnapshot(
//         doc(
//           db,
//           "customers",
//           user.uid,
//           "checkout_sessions",
//           checkoutSessionRef.id
//         ),
//         (snap) => {
//           const { error, sessionId } = snap.data();

//           if (error) {
//             alert("An error occurred", error);
//           }

//           if (sessionId) {
//             const redirectToCheckout = async () => {
//               const stripe = await loadStripe(
//                 "PUBLIC_KEY"
//               );
//               stripe.redirectToCheckout({
//                 sessionId,
//               });
//             };

//             redirectToCheckout();
//           }
//         }
//       );

//       // Cleanup function to unsubscribe from snapshot listener when component unmounts
//       return () => unsubscribe();
//     } catch (error) {
//       console.error("Error creating checkout session:", error);
//       // Handle error
//     }
//   };

//   return (
//     <div className="planScreen">
//       {Object.entries(products).map(([productId, productData]) => {
//         // TODO

//         return (
//           <div className="planScreen__plan">
//             <div className="planScreen__info">
//               <h5>{productData.name}</h5>
//               <h6>{productData.description}</h6>
//             </div>

//             <button onClick={() => loadCheckout(productData.prices.priceId)}>
//               Subscribe
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default PlanScreen;
