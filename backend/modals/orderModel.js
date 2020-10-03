import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    // Customer Details
    userId: { type: String, required: false },
    name: { type: String, required: false },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    deliveryAddress: { type: String, required: false },
    paymentAddress: { type: String, required: false },

    request: {
        type: [{
            creation_date: { type: Date, required: false },
            created_by: { type: String, required: false },

            isPrepare: { type: Boolean, required: false },
            isPlace: { type: Boolean, required: false },
            isCancel: { type: Boolean, required: false },
            isReturn: { type: Boolean, required: false },

            confirmation: {
                placement: { type: String, required: false }, // rejected,approved
                cancellation: { type: String, required: false },// rejected,approved
                return: { type: String, required: false },// rejected,approved
            },

            operatedBy: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
            },

            payment: {
                status: { type: String, required: false },//collected, unpaid, canceled, refunded
                collectOn: { type: String, required: false }, //date
                title: { type: String, required: false },
                method: { type: String, required: false },
                assignedTo: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },
                doneBy: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },
                charge: { type: Number, required: false },
            },

            delivery: {
                status: { type: String, required: false }, //onroad, delivered, canceled, notdelivered, returned
                deliverOn: { type: String, required: false }, //date
                title: { type: String, required: false },
                method: { type: String, required: false },
                duration: { type: String, required: false },
                assignedTo: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },
                doneBy: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },
                charge: { type: String, required: false },
            },

            cart: {
                status: { type: String, required: false },//preparing, ready, returned
                items: {
                    type: [{
                        _id: { type: String, required: false },
                        nameEn: { type: String, required: false },
                        image: { type: String, required: false },
                        brand: { type: String, required: false },
                        unit: { type: String, required: false },
                        discount: { type: String, required: false },
                        qty: { type: String, required: false },
                        priceUsd: { type: String, required: false },
                        refundable: { type: Boolean, required: false },
                    }], required: false
                },

                assignedTo: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },

                doneBy: {
                    date: { type: String, required: false },
                    employeeName: { type: String, required: false },
                    employeeId: { type: String, required: false },
                },

                qty: { type: Number, required: false },
                amount: { type: Number, required: false },
            },

            // callCenter: {
            // type: {[
            //      agent: {}    
            //      issue: {}
            //      sensitivityLvl: {}   
            // ]}, required: false
            // },
            totalAmount: { type: Number, required: true },
        }], required: false
    },

    invoiceAmount: { type: Number, required: true },
    customerNote: { type: String, required: false },
    adminNote: {
        type: [{
            employeeName: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false },
            showTo: { type: Array, required: false },
        }], required: false
    },
    closed: { type: Boolean, required: false },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

// setorderstatus: unrequested/requested/confirmed/(declined)/pending/completed/
// cancelorderstatus: requestCancelation/canceled/cancellationRejected/

// Note: {Customer, Admin}

// cartItems: preparing, ready
// payment status: pending payment(case not paid), paid, notpaid(case delivered but not paid), canceled, refunded, not refunded
// delivery status: on road, delivered, notDelivered
// delivery method
// payment method: cash - check - credit card - pos