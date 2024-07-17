# -*- coding: utf-8 -*-
{
    'name': "POS Category Wise Discount Limit",
    'summary': 'POS Category Wise Discount Limit',
    'description': 'POS Category Wise Discount Limit',
    'license': 'LGPL-3',
    'application': True,

    'depends': ['base', 'point_of_sale'],

    'data': [
             'views/res_config_settings_views.xml',
             'views/pos_category_views.xml',
             ],
    'assets': {
         'point_of_sale._assets_pos': [
            'pos_category_wise_discount/static/src/js/pos_category_wise_discount.js',
         ],
    },
}