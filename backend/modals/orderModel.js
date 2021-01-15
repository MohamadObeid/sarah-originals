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
            creation_date: { type: String, required: false },
            created_by: { type: String, required: false },
            type: { type: String, required: false },
            status: { type: String, required: false },
            modifiedRequestNum: { type: Number, required: false }, // index + 1 (usually it is the first request)

            payment: {
                status: { type: String, required: false },//collected, unpaid, canceled, refunded
                collectOn: { type: String, required: false }, //date, upon delivery, upon receipt
                title: { type: String, required: false },
                type: { type: String, required: false }, //cash, check, bank transfer, VISA
                description: { type: String, required: false },
                charge: { type: Number, required: false },
            },

            delivery: {
                status: { type: String, required: false }, //onroad, delivered, canceled, notdelivered, returned
                deliverOn: { type: String, required: false }, //date
                title: { type: String, required: false },
                duration: { type: String, required: false },
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
                        qty: { type: Number, required: false },
                        priceUsd: { type: Number, required: false },
                        returnable: { type: Boolean, required: false },
                    }], required: false
                },

                qty: { type: Number, required: false },
                amount: { type: Number, required: false },
                discountAmount: { type: Number, required: false },
            },

            amount: { type: Number, required: true },
            receiptNum: { type: String, required: false },
        }], required: false
    },

    assignment: {
        type: [{
            assignedOn: { type: String, required: false },
            assignedBy: { type: String, required: false },
            req_id: { type: String, required: false },
            receiptNum: { type: String, required: false },
            //edited: { type: Boolean, required: false },
            type: { type: String, required: false },// payment, delivery, cart, request
            status: { type: String, required: false },// unassigned, pending, accepted, Accomplished, rejected, canceled, closed (for uncompleted assignment and closed by manager)
            onHold: { type: Boolean, required: false },
            onHoldReason: { type: String, required: false },
            employeeName: { type: String, required: false },
            employeeId: { type: String, required: false },
            closedDate: { type: String, required: false },
        }], required: false
    },

    amount: { type: Number, required: false },
    invoiceNum: { type: String, required: false },
    dueDate: { type: String, required: false },
    note: {
        type: [{
            name: { type: String, required: false },
            text: { type: String, required: false },
            date: { type: String, required: false },
            showTo: { type: Array, required: false },
            edited: { type: String, required: false },
        }], required: false
    },
    closedDate: { type: Date, required: false },
});

//orderSchema.plugin(timeZone, { paths: {} })
const Order = mongoose.model("Order", orderSchema)

export default Order;

// setorderstatus: unrequested/requested/confirmed/(declined)/pending/completed/
// cancelorderstatus: requestCancelation/canceled/cancellationRejected/

// Note: {Customer, Admin}

// cartItems: preparing, ready
// payment status: pending payment(case not paid), paid, notpaid(case delivered but not paid), canceled, refunded, not refunded
// delivery status: on road, delivered, notDelivered
// delivery method: motor, pickup, rapid
// payment method: cash - check - credit card - pos