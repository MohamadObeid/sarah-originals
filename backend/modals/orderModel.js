import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        cancelRequest: { type: Boolean, required: false, default: false },
        returnRequest: { type: Boolean, required: false, default: false },
        placed: { type: Boolean, required: false, default: false },
        completed: { type: Boolean, required: false, default: false },
        confirmed: { type: Boolean, required: false, default: false },
        canceled: { type: Boolean, required: false, default: false },
        rejected: { type: Boolean, required: false, default: false },
        accomplishment: {
            type: [{
                isReturn: { type: Boolean, required: false, default: false },
                cart: { type: String, required: false },
                delivery: { type: String, required: false },
                payment: { type: String, required: false },
            }], required: false
        },
    },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },

    operatedBy: {
        date: { type: String, required: false },
        employeeName: { type: String, required: false },
        employeeId: { type: String, required: false },
    },

    customerDetails: {
        userId: { type: String, required: false },
        name: { type: String, required: false },
        phone: { type: String, required: false },
    },

    payment: {
        type: [{
            collectOn: { type: String, required: false }, //date
            isRefund: { type: Boolean, required: false, default: false },
            title: { type: String, required: false },
            method: { type: String, required: false },
            address: { type: String, required: false },

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

            note: {
                type: [{
                    employeeName: { type: String, required: false },
                    text: { type: String, required: false },
                    date: { type: String, required: false },
                }], required: false
            },
        }], required: false
    },

    delivery: {
        type: [{
            deliverOn: { type: String, required: false }, //date
            isReturn: { type: Boolean, required: false, default: false },
            title: { type: String, required: false },
            method: { type: String, required: false },
            duration: { type: String, required: false },
            address: { type: String, required: false },

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

            note: {
                type: [{
                    employeeName: { type: String, required: false },
                    text: { type: String, required: false },
                    date: { type: String, required: false },
                }], required: false
            },
        }], required: false
    },

    cart: {
        type: [{
            isReturn: { type: Boolean, required: false, default: false },
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

            note: {
                type: [{
                    employeeName: { type: String, required: false },
                    text: { type: String, required: false },
                    date: { type: String, required: false },
                }], required: false
            },
        }], required: false
    },

    // callCenter: {
    // type: {[
    //      agent: {}    
    //      issue: {}
    //      sensitivityLvl: {}   
    // ]}, required: false
    // },

    totalAmount: { type: Number, required: true },
    customerNote: { type: String, required: false },
    adminNote: { type: String, required: false },
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