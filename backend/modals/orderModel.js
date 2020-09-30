import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        placed: { type: Boolean, required: false, default: false },
        confirmed: { type: Boolean, required: false, default: false },
        canceled: { type: Boolean, required: false, default: false },
        rejected: { type: Boolean, required: false, default: false },
        confirmation: {
            cartItmes: { type: String, required: false },
            delivery: { type: String, required: false },
            payment: { type: String, required: false },
        },
        return: {
            cartItmes: { type: String, required: false },
            delivery: { type: String, required: false },
            payment: { type: String, required: false },
        },
    },
    creation_date: { type: Date, required: false, default: Date.now },
    created_by: { type: String, required: false },

    operatedBy: {
        date: { type: String, required: false },
        employeeName: { type: String, required: false },
        employeeId: { type: String, required: false },
        note: { type: String, required: false },
    },

    customer: {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        IP: { type: String, required: false },
    },

    payment: {
        type: [{
            collectAt: { type: String, required: false },
            isRefund: { type: Boolean, required: false, default: false },
            title: { type: String, required: false },
            method: { type: String, required: false },
            address: { type: String, required: false },

            assignedTo: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            accomplishedBy: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            charge: { type: Number, required: false },
            adminNote: { type: String, required: false },
        }], required: false
    },

    delivery: {
        type: [{
            deliverAt: { type: String, required: false },
            isReturn: { type: Boolean, required: false, default: false },
            title: { type: String, required: false },
            method: { type: String, required: false },
            duration: { type: String, required: false },
            address: { type: String, required: false },

            assignedTo: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            accomplishedBy: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            charge: { type: String, required: false },
            note: { type: String, required: false },
        }], required: false
    },

    cartItmes: {
        type: [{
            isReturn: { type: Boolean, required: false, default: false },
            items: {
                type: [{
                    nameEn: { type: String, required: false },
                    image: { type: String, required: false },
                    brand: { type: String, required: false },
                    category: { type: Array, required: false },
                    unit: { type: String, required: false },
                    discount: { type: String, required: false },
                    count: { type: String, required: false },
                    priceUsd: { type: String, required: false },
                    refundable: { type: Boolean, required: false },
                }], required: false
            },

            assignedTo: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            accomplishedBy: {
                date: { type: String, required: false },
                employeeName: { type: String, required: false },
                employeeId: { type: String, required: false },
                note: { type: String, required: false },
            },

            itemsCount: { type: Number, required: false },
            itemsAmount: { type: Number, required: false },
            note: { type: String, required: false },
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