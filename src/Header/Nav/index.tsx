'use client'
import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const [openDropdown, setOpenDropdown] = useState<number | null>(null)
  const navItems = data?.navItems || []

  const handleDropdownClick = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index)
  }

  const closeDropdown = () => {
    setOpenDropdown(null)
  }

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        const subItems = item?.subItems || []
        const hasSubItems = subItems.length > 0

        if (hasSubItems) {
          return (
            <div key={i} className="relative inline-block text-left">
              <button
                onClick={() => handleDropdownClick(i)}
                className="inline-flex items-center gap-x-1 px-3 py-2 hover:bg-gray-100 rounded-md"
              >
                {item.link?.label} {/* Access link directly on item */}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    openDropdown === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openDropdown === i && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in-0 zoom-in-95">
                  {subItems.map(
                    (
                      item,
                      i, // Iterate over subItems array
                    ) => (
                      <CMSLink
                        key={i}
                        {...item.subItem.link}
                        // appearance="link"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={closeDropdown}
                      />
                    ),
                  )}
                </div>
              )}
            </div>
          )
        }

        // Render top-level link if no subitems
        return <CMSLink key={i} {...item?.link} appearance="link" />
      })}
    </nav>
  )
}
