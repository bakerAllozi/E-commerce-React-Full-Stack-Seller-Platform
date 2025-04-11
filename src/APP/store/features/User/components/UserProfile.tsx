// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import { useState } from 'react';
// import { DndContext } from '@dnd-kit/core';



// interface TabPanelProps {
//   children?: React.ReactNode;
//   index: number;
//   value: number;
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index: number) {
//   return {
//     id: `vertical-tab-${index}`,
//     'aria-controls': `vertical-tabpanel-${index}`,
//   };
// }
// const ItemHeader = () =>{
//   return (
//     <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold">Item Header</h2>
//     </div>
//   );
// }

// export default function VerticalTabs() {
//   const [value, setValue] =useState<number>(0);

//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue);
//   };

//   return (
//     <Box
//       sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
//     >
//       <Tabs
//         orientation="vertical"
//         variant="scrollable"
//         value={value}
//         onChange={handleChange}
//         aria-label="Vertical tabs example"
//         sx={{ borderRight: 1, borderColor: 'divider' }}
//       >
//         <Tab label="Item header" {...a11yProps(0)} />
//         <Tab label="Item Two" {...a11yProps(1)} />
//         <Tab label="Item Three" {...a11yProps(2)} />
//         <Tab label="Item Four" {...a11yProps(3)} />
//         <Tab label="Item Five" {...a11yProps(4)} />
//         <Tab label="Item Six" {...a11yProps(5)} />
//         <Tab label="Item Seven" {...a11yProps(6)} />
//       </Tabs>

      
//       <TabPanel value={value} index={0}>
//         <DndContext>
//         <ItemHeader/>
//         </DndContext>
//       </TabPanel>
//       <TabPanel value={value} index={1}>
//         Item Two
//       </TabPanel>
//       <TabPanel value={value} index={2}>
//         Item Three
//       </TabPanel>
//       <TabPanel value={value} index={3}>
//         Item Four
//       </TabPanel>
//       <TabPanel value={value} index={4}>
//         Item Five
//       </TabPanel>
//       <TabPanel value={value} index={5}>
//         Item Six
//       </TabPanel>
//       <TabPanel value={value} index={6}>
//         Item Seven
//       </TabPanel>
//     </Box>
//   );
// }


import  { useState } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [droppedItems, setDroppedItems] = useState<{
    id: number;
    x: number;
    y: number;
  }[]>([]);
  const [save , setSave] = useState(false); // حالة حفظ العناصر المسقطة
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });  // تخزين الموقع الأصلي
console.log(droppedItems)
const handleDragEnd = (event: any, info: any, id: number) => {
  const { x, y } = info.point; // إحداثيات الإسقاط على الشاشة

  setDroppedItems((prevItems) => {
    const existingIndex = prevItems.findIndex((e) => e.id === id);

    if (existingIndex !== -1) {
      // إذا العنصر موجود، نقوم بتحديث الإحداثيات فقط
      const updatedItems = [...prevItems];
      updatedItems[existingIndex] = { ...updatedItems[existingIndex], x, y };
      return updatedItems;
    } else {
      // إذا غير موجود، نضيفه جديد
      return [...prevItems, { id, x, y }];
    }
  });

  // إعادة العنصر إلى مكانه الأصلي
  setInitialPosition({ x: 0, y: 0 });
};


  return (
    <div className=" bg-red-700 ">
     
    {
      save ? 
    
  <motion.div
className="w-10 h-10 bg-blue-500 flex justify-center items-center rounded-lg cursor-grab mb-4"
drag
dragConstraints={{ top: 0, left: 0, right: 300, bottom: 300 }}
onDragEnd={(event, info) => handleDragEnd(event, info, 1)}  // استدعاء الدالة عند انتهاء السحب
// whileDrag={{ scale: 2.1 }} 
// initial={{ x: initialPosition.x, y: initialPosition.y }}  // تحديد الموقع الأصلي
// animate={{ x: initialPosition.x, y: initialPosition.y }}  // إعادة المربع إلى الموقع الأصلي
dragTransition={{ power: 0, timeConstant: 0, bounceStiffness: 0, bounceDamping: 0 }} // تعطيل القصور الذاتي
>
عنصر 1
</motion.div>

   

      
      :
      droppedItems.map((item) => (
          <motion.div
            key={item.id}
            className="w-10 h-10 bg-blue-500 flex justify-center items-center rounded-lg cursor-grab mb-4"
            // initial={{ x:item.x , y: item.y }} 
            // animate={{ x:item.x , y: item.y }}  
            drag={false}
            style={{ position: 'absolute', top: item.y, left: item.x }}
        
          >
            {`عنصر ${item.id}`}
          </motion.div>
        ))
      
        
        }

    
        <button
        onClick={() => setSave(!save)}
        >
Save
        </button>
      </div>
  );
}

export default App;
