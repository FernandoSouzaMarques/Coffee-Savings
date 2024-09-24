import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { FC } from 'react'
interface ITabItem {
  id: string;
  name: string;
}

interface ITabsProps {
  items: ITabItem[];
  onChange: (id: string) => void;
}

export const Tabs: FC<ITabsProps> = ({ items, onChange }) => {

  function handleChange(index: number) {
    onChange(items[index].id)
  }
  return (
    <div className="flex w-full justify-center py-2 px-4">
      <div className="w-full max-w-md">
        <TabGroup onChange={handleChange}>
          <TabList className="flex gap-4">
            {items.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-white/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                {name}
              </Tab>
            ))}
          </TabList>
        </TabGroup>
      </div>
    </div>
  )
}
