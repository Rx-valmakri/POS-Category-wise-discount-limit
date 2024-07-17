# -*- coding: utf-8 -*-
from odoo import models, fields


class PosCategory(models.Model):
    _inherit = 'pos.category'

    company_id = fields.Many2one('res.company', string='Company',
                                 default=lambda self: self.env.company,
                                 readonly=True)
    currency_id = fields.Many2one(related='company_id.currency_id')
    discount_limit = fields.Monetary(string='Discount Limit', help='discount limit in amount')
    is_pos_settings_enabled = fields.Boolean(compute="compute_is_pos_settings_enabled")

    def compute_is_pos_settings_enabled(self):
        print("hai")
        enable_or_not = self.env['ir.config_parameter'].sudo().get_param('pos_category_wise_discount.is_discount_limit')
        if enable_or_not:
            self.is_pos_settings_enabled = True
        else:
            self.is_pos_settings_enabled = False

