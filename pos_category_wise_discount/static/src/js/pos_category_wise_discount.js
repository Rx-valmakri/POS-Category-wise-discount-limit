/** @odoo-module */
import { patch } from "@web/core/utils/patch";
import { PosStore } from "@point_of_sale/app/store/pos_store";
import { Order } from "@point_of_sale/app/store/models";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";


patch(PosStore.prototype, {
     async _processData(loadedData) {
        await super._processData(...arguments);
        this.pos_category = loadedData["pos.category"];
        console.log("pos store : ", this)
        }
});

patch(Order.prototype, {
    pay() {
        console.log("pay function worked")
        console.log("order : ", this)
        var category_list = this.pos.pos_category
        console.log("category_list : ", category_list)
        for (var cat=0; cat<category_list.length; cat++)
        {
            console.log("category wise order lines (", category_list[cat].name, ") : ", this.orderlines.filter((orderLine) => orderLine.product.pos_categ_ids[0] === category_list[cat].id))
            var cat_wise_oder_line = this.orderlines.filter((orderLine) => orderLine.product.pos_categ_ids[0] === category_list[cat].id)
            var category_wise_discount = []
            for (var line=0; line<cat_wise_oder_line.length; line++)
            {
                   var tax_amount = this.pos.taxes_by_id[cat_wise_oder_line[line].product.taxes_id[0]].amount
                   var price_with_tax = cat_wise_oder_line[line].price + cat_wise_oder_line[line].price * tax_amount/100
                   console.log("price with tax : ", price_with_tax)
                   if (cat_wise_oder_line[line].discount != 0)
                   {
                      var discount_amount = cat_wise_oder_line[line].quantity * price_with_tax * cat_wise_oder_line[line].discount/100
                      console.log("discount amount of ",cat_wise_oder_line[line].full_product_name," : ", discount_amount)
                      category_wise_discount.push(discount_amount)
                   }

            }
            console.log("category_wise_discount  of ", category_list[cat].name," : ", category_wise_discount)
            var sum = 0
            category_wise_discount.forEach(x => {
               sum += x;
            });
            console.log("sum of category_wise_discount : ",sum)
            if (category_list[cat].is_pos_settings_enabled && category_list[cat].discount_limit < sum)
            {

                this.pos.popup.add(ErrorPopup, {
                      title: ('Discount Limit'),
                      body: (category_list[cat].name+' Category Discount Limit Exceeded'),
                });
            }
        }
        console.log(this.pos.popup.popups)
        if (Object.keys(this.pos.popup.popups).length != 0)
        {
          return false;
        }
        super.pay(...arguments);
    }
});

//patch(Orderline.prototype, {
//    setup() {
//        super.setup(...arguments);
//        console.log("order line : ", this);
//        var total_price = this.price
//        var tax = this.tax_ids[0]
//        console.log("price : ", total_price)
//        console.log("tax id : ", tax)
//        const orderlines_by_cid = getByCID("c1");
//        console.log("order lines by cid : ", orderlines_by_cid)
//        const order_lines_product = this.getByCID()
//        console.log("order lines product by category desk : ", order_lines_product)
//        },
//});


//patch(ProductScreen.prototype, {
//    setup() {
//        super.setup(...arguments);
//        console.log("product screen : ", this)
//    }
//});

//patch(ActionpadWidget.prototype, {
//    setup() {
//        super.setup(...arguments);
//        console.log("Action widget : ", this.pos.get_order().orderlines.find(
//            (orderLine) =>
//                orderLine.product.pos_categ_ids[0] === 1
//        ))
//        console.log(this)
//        if (this.pos.get_order().orderlines.find((orderLine) => orderLine.product.pos_categ_ids[0] === 1))
//        {
//           this.pos.popup.add(ErrorPopup, {
//                title: ('sample'),
//                body: ('sample test'),
//            });
//            return this.pos.get_order().pay();
//        }
//    }
//});

//patch(PaymentScreen.prototype, {
//    setup() {
//        super.setup(...arguments);
//        console.log("payment screen : ", this)
//        if (this.pos.get_order().orderlines.find((orderLine) => orderLine.product.pos_categ_ids[0] === 1))
//        {
//           this.popup.add(ErrorPopup, {
//                title: ('sample'),
//                body: ('sample test'),
//            });
//            return this.pos.get_order().orderlines;
//        }
//    }
//});

//patch(OrderWidget.prototype, {
//     setup() {
//        super.setup(...arguments);
//        console.log("inside order widget : ", this)
//     }
//});

//publicWidget.registry.PaymentButton = publicWidget.Widget.extend({
//     selector: 'button[name="o_payment_submit_button"]',
//});




