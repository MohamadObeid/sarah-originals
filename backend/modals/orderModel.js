import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    status: {
        confirmed: { type: Boolean, required: false, default: false },
        canceled: { type: Boolean, required: false, default: false },
        rejected: { type: Boolean, required: false, default: false },
        confirmation: {
            type: [{
                cart: { type: String, required: false },
                delivery: { type: String, required: false },
                payment: { type: String, required: false },
            }], required: true, default: []
        },
        returned: {
            type: [{
                cart: { type: String, required: true, default: '' },
                delivery: { type: String, required: true, default: '' },
                payment: { type: String, required: true, default: '' },
            }], required: true, default: []
        },
    },
    created_on: { type: Date, required: true, default: Date.now },
    created_by: { type: String, required: true, default: '' },

    assigned_to: {
        name: { type: String, required: true, default: '' },
        date: { type: String, required: true, default: '' },
    },

    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true, default: '' },
        phone: { type: Number, required: true, default: null },
    },

    payment: {
        type: [{
            isRefund: { type: Boolean, required: true, default: false },
            title: { type: String, required: true, default: '' },
            type: { type: String, required: true, default: '' },
            address: { type: String, required: true, default: '' },
            assignedTo: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            done_by: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            charge: { type: Number, required: true, default: null },
            adminNote: { type: String, required: false, default: '' },
        }], required: false, default: []
    },

    delivery: {
        type: [{
            isReturn: { type: Boolean, required: true, default: false },
            title: { type: String, required: true, default: '' },
            type: { type: String, required: true, default: '' },
            duration: { type: Number, required: true, default: 0 },
            address: { type: String, required: true, default: '' },
            assignedTo: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            doneBy: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            charge: { type: Number, required: true, default: null },
            adminNote: { type: String, required: false, default: '' },
        }], required: false, default: []
    },

    cart_itmes: {
        type: [{
            isReturn: { type: Boolean, required: true, default: false },
            items: {
                type: [{
                    nameEn: { type: String, required: true },
                    image: { type: String, required: true },
                    brand: { type: String, required: false },
                    category: { type: Array, required: true, default: [] },
                    unit: { type: String, default: '', required: true },
                    discount: { type: Number, default: 0, required: true },
                    count: { type: Number, default: 0, required: true },
                    priceUsd: { type: Number, default: 0, required: true }
                }], required: true, default: []
            },

            assigned_to: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            done_by: {
                name: { type: String, required: true, default: '' },
                date: { type: String, required: true, default: '' },
            },
            count: { type: Number, required: true },
            value: { type: Number, required: true },
            admin_note: { type: String, required: false, default: '' },
        }], required: false, default: []
    },

    total_value: { type: Number, required: true },
    customer_note: { type: String, required: false },
    admin_note: { type: String, required: false },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

// setorderstatus: unrequested/requested/confirmed/(declined)/pending/completed/
// cancelorderstatus: requestCancelation/canceled/cancellationRejected/

// Note: {Customer, Admin}

// cartItems: preparing, ready
// payment status: pending payment(case not paid), paid, notpaid(case delivered but not paid), canceled, refunded, not refunded
// delivery status: on road, delivered, notDelivered