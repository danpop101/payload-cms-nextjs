import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
// import { block } from 'payload/config'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      // fields: [
      //   link({
      //     appearances: false,
      //   }),
      // ],
      fields: [
        link({
          name: 'link', // Explicitly name the link field
          appearances: false,
        }),
        {
          name: 'subItems',
          type: 'array',
          fields: [
            {
              name: 'subItem', // Added name here as well
              type: 'group',
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  required: true,
                },
                link({
                  name: 'link',
                  appearances: false,
                  // required: true,
                }),
              ],
            },
          ],
          admin: {
            condition: (_, siblingData) => !siblingData?.link?.url, // Only show subItems if link is not set
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
