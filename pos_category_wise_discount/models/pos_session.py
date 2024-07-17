# -*- coding: utf-8 -*-
from odoo import models


class PosSessions(models.Model):
    _inherit = 'pos.session'

    def _loader_params_pos_category(self):
        """ It is used to add discount_limit and is_pos_settings_enabled fields
         into Pos.Category model"""
        result = super()._loader_params_pos_category()
        result['search_params']['fields'].append('discount_limit')
        result['search_params']['fields'].append('is_pos_settings_enabled')
        print("result : ", result)
        return result
