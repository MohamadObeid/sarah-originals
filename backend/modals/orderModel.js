import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({

    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },
    active: { type: Boolean, required: false },
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
            type: { type: String, required: false },
            status: { type: String, required: false },
            canceledRequestNum: { type: Number, required: false },

            operatedBy: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
            },

            payment: {
                status: { type: String, required: false },//collected, unpaid, canceled, refunded
                collectOn: { type: String, required: false }, //date, upon delivery, upon receipt
                title: { type: String, required: false },
                type: { type: String, required: false }, //cash, check, bank transfer, VISA
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
                description: { type: String, required: false },
                charge: { type: Number, required: false },
            },

            delivery: {
                status: { type: String, required: false }, //onroad, delivered, canceled, notdelivered, returned
                deliverOn: { type: String, required: false }, //date
                title: { type: String, required: false },
                //type: { type: String, required: false },
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
                charge: { type: Number, required: false },
            },

            cart: {
                status: { type: String, required: false },//preparing, packed, returned
                prepareOn: { type: String, required: false },
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
                discountAmount: { type: Number, required: false },
            },

            // callCenter: {
            // type: {[
            //      agent: {}    
            //      issue: {}
            //      sensitivityLvl: {}   
            // ]}, required: false
            // },
            totalAmount: { type: Number, required: true },
            receiptNum: { type: String, required: false }
        }], required: false
    },

    amount: { type: Number, required: false },
    invoiceNum: { type: String, required: false },
    note: {
        type: [{
            name: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false },
            showTo: { type: Array, required: false },
            edited: { type: String, required: false },
        }], required: false
    },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

// setorderstatus: unrequested/requested/confirmed/(declined)/pending/completed/
// cancelorderstatus: requestCancelation/canceled/cancellationRejected/

// Note: {Customer, Admin}

// cartItems: preparing, ready
// payment status: pending payment(case not paid), paid, notpaid(case delivered but not paid), canceled, refunded, not refunded
// delivery status: on road, delivered, notDelivered
// delivery method: motor, pickup, rapid
// payment method: cash - check - credit card - pos