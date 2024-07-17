# -*- coding: utf-8 -*-
from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = 'res.config.settings'

    is_discount_limit = fields.Boolean(string='Product Category Discount limit',
                                       config_parameter='pos_category_wise_discount.is_discount_limit',
                                       help='Check this field for enabling discount limit')

    def set_values(self):
        super().set_values()
        if self.is_discount_limit:
            print("discount limit is enabled")
        else:
            print("discount limit is disabled")
