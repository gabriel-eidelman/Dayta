// interface TimeSelectionProps {
// selectedHour: string;
// selectedMinute: string;
// selectedPeriod: string; // AM or PM
// onHourChange: (hour: string) => void;
// onMinuteChange: (minute: string) => void;
// onPeriodChange: (period: string) => void;
// }

// const TimeSelectionBlock: React.FC<TimeSelectionProps> = ({ selectedHour, selectedMinute, selectedPeriod, onHourChange, onMinuteChange, onPeriodChange }) => {
//     const [showTimePicker, setShowTimePicker] = React.useState(false);
//     return (
//         <>
//             <Pressable onPress={() => setShowTimePicker(prev => !prev)}>

//     return (
//             <Pressable onPress={() => setShowTimePicker(prev => !prev)}>
//         <View style={styles.timeText}>
//         <Text>Start</Text>
//         <Text>{formatTime()}</Text>
//         </View>
//     </Pressable>
    
//     {showTimePicker && (
//         <TimeDropdown
//         selectedHour={selectedHour}
//         selectedMinute={selectedMinute}
//         selectedPeriod={selectedPeriod}
//         onHourChange={setSelectedHour}
//         </>
//     );
//         };
//         />
//     )}
//     );
// });

// export default TimeSelectionBlock;