import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "./request.css";

const firebaseConfig = {
    apiKey: "AIzaSyDTETlCetLThB_xkGSi-cPzctRqZGG_G2E",
    authDomain: "shopsavvy1-470e8.firebaseapp.com",
    projectId: "shopsavvy1-470e8",
    storageBucket: "shopsavvy1-470e8.appspot.com",
    messagingSenderId: "8106289071",
    appId: "1:8106289071:web:161f3664d9ff673512b15a",
    measurementId: "G-Y0GXMF37CK"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to fetch Requests from Firestore
export async function fetchRequests() {
    const requestsRef = collection(db, 'Requests');
    const snapshot = await getDocs(requestsRef);

    const requests = snapshot.docs.map(doc => {
        const requestId = doc.id; // Accessing the document ID
        const requestData = doc.data(); // Accessing the document data
        return { id: requestId, ...requestData }; // Combine ID with document data
    });

    return requests;
}

// RequestPage component to fetch and render Requests
function RequestPage() {
    const [requests, setRequests] = useState([]);
    const [notificationMessage, setNotificationMessage] = useState("");

    useEffect(() => {
        // Call fetchRequests when the component mounts
        fetchRequests().then(requests => {
            setRequests(requests);
        });
    }, []);

    const addToProducts = async (requestId) => {
        try {
            console.log("Request ID:", requestId);
            
            const requestRef = doc(db, 'Requests', requestId);
            console.log("Request Reference:", requestRef);
    
            const requestSnapshot = await getDoc(requestRef); // Use getDoc function instead of requestRef.get()
            const requestData = requestSnapshot.data();
    
            if (requestData) {
                // Add the request data to the products collection
                const productsRef = collection(db, 'Products');
                await addDoc(productsRef, requestData);
                console.log("Request added to products:", requestData);
    
                // Optional: You can also delete the request after adding it to products
                await deleteDoc(requestRef); // Use deleteDoc function to delete the document
                console.log("Request deleted from requests:", requestId);
    
                // Fetch updated requests
                const updatedRequests = await fetchRequests();
                setRequests(updatedRequests);
            }
        } catch (error) {
            console.error("Error adding request to products:", error);
        }
    };
    const deleteRequest = async (requestId) => {
        try {
            const requestRef = doc(db, 'Requests', requestId);
            
            // Delete the request from the requests collection
            await deleteDoc(requestRef);
            console.log("Request deleted from requests:", requestId);

            // Fetch updated requests
            const updatedRequests = await fetchRequests();
            setRequests(updatedRequests);
        } catch (error) {
            console.error("Error deleting request:", error);
        }
    };
    const sendNotification = async (requestId) => {
        try {
            const requestRef = doc(db, 'Requests', requestId);
            const requestSnapshot = await getDoc(requestRef);
            const requestData = requestSnapshot.data();

            const messagePayload = {
                notification: {
                    title: 'Request Update',
                    body: notificationMessage
                },
                token: requestData.userToken
            };

            await fetch('https://shopsavvy1-470e8.cloudfunctions.net/sendNotification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messagePayload)
            });
            console.log("Notification sent to user:", requestData.userToken);
        } catch (error) {
            console.error("Error sending notification:", error);
        }
    };


    return (
        <div className="request-container">
            <h1>Requests</h1>
            {requests.map(request => (
                <div key={request.id} className="request-card">
                    <p className="request-seller">{request.seller}</p>
                    <h3 className="request-title">{request.Nom}</h3>
                    <p className="request-description">{request.Constituants}</p>
                    <img className="request-image" src={request.Image} alt={request.name} />
                    <p className="request-price">Price: {request.Prix} DH</p>
                    <div className="request-buttons">
                        <button onClick={() => addToProducts(request.id)}>Accept</button>
                        <button onClick={() => deleteRequest(request.id)}>Reject</button>
                        <button onClick={() => sendNotification(request.id)}>Send Notification</button>
                    </div>
                    <div className="notification-input">
                        <input 
                            type="text" 
                            placeholder="Enter notification message" 
                            value={notificationMessage} 
                            onChange={(e) => setNotificationMessage(e.target.value)} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RequestPage;
