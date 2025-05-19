// %    const renderContent = () => {
// %       if (pageType === "Create" && value === 'Activity') {
// %         return (
// %           <View style={styles.container}>
// %             <View style={styles.textSection}>
// %               <View style={{alignItems: 'center'}}>
// %                 <Text style={styles.inputTitle}>Create Custom Activity</Text>
// %               </View>
// %               <View style={styles.textContainer}>
// %                 <ThemedText type="subtitle">Activity Name: </ThemedText>
// %                 <View style={styles.inputText}>
// %                   <TextInput value={inputText} 
// %                       onChangeText={handleInputChange}
// %                       maxLength={30}
// %                       keyboardType="default" 
// %                       // onSubmitEditing={() => handleSubmit(newButton)}
// %                       returnKeyType="done"
// %                       style={styles.textInputContainer}
// %                   />
// %                 </View>
// %               </View>
// %             </View>
// %         <View style={styles.tagSection}>
// %           <ThemedText type="subtitle">Add Tags: </ThemedText>
// %             <View style={styles.tagsContainer}>
// %               <View style={styles.tagStyle}>
// %               <TagDropdown tagValue={tag1Value} setTagValue={setTag1Value}/>
// %               </View>
// %               <View style={styles.tagStyle}>
// %               <TagDropdown tagValue={tag2Value} setTagValue={setTag2Value}/>
// %               </View>
// %             </View>
// %          </View>
// %         <View style={styles.createContainer}>
// %             <TouchableOpacity onPress={handleSubmit} style={styles.closeButton}>
// %               <Text style={styles.buttonText}>Create Activity</Text>
// %             </TouchableOpacity>
// %           </View>
// %         </View>
// %         );
// %       } else if (pageType === "Create" && value === 'Routine') {
// %         return (
// %           <View style={styles.container}>
// %           <View style={styles.textSection}>
// %             <View style={{alignItems: 'center'}}>
// %               <Text style={styles.inputTitle}>Create Custom Routine</Text>
// %             </View>
// %             <View style={styles.textContainer}>
// %             <ThemedText type="subtitle">Routine Name: </ThemedText>
// %             <View style={styles.inputText}>
// %             <TextInput value={routineName} 
// %                 onChangeText={handleRoutineInputChange}
// %                 maxLength={30}
// %                 keyboardType="default" 
// %                 // onSubmitEditing={() => handleSubmit(newButton)}
// %                 returnKeyType="done"
// %                 style={styles.textInputContainer}
// %             />
// %             </View>
// %             </View>
// %           </View>
// %           <View style={styles.setUp}>
// %             <ThemedText type="subtitle">Set Up Routine: </ThemedText>
// %             {/* <TouchableOpacity style={styles.addRoutineButton} onPress={() => setCreateRoutineModalVisible(true)}> */}
// %               <CustomButton title="Add Activities" color="#ADD8E6" width={width*0.5} onPress={() => setCreateRoutineModalVisible(true)}/>
// %           </View>
// %           <View style={styles.createContainer}>
// %               <TouchableOpacity onPress={() => handleRoutineSubmit()} style={styles.closeButton}>
// %                 <Text style={styles.buttonText}>Create Routine</Text>
// %               </TouchableOpacity>
// %             </View>
// %           </View>
// %         );
// %       } else if (pageType === "Edit" && value === 'Activity') {
// %         const alphabeticalActs = customActivities.sort((a, b) => a.text.localeCompare(b.text));
// %         return (
// %           <View style={styles.container}>
// %               <FlatList
// %                 ref={flatListRef}
// %                 data={alphabeticalActs}
// %                 keyExtractor={(item) => item.text}
// %                 style={styles.flatList}
// %                 renderItem={({ item}) => ( 
// %                   <TouchableOpacity onPress={() => customActTapped(item)}>
// %                   <View style={styles.resultContainer}>

                      
// %                         <Text style={{fontWeight: 'bold'}}>{item.text}</Text>  

// %                         <AntDesign name="edit" size={width / 15} color="orange" />

// %                         <TouchableOpacity onPress={() => deleteCustomActivity(item)} style={styles.touchableDelete}>
// %                         <MaterialIcons name="delete" size={width / 15} color="black" />
// %                       </TouchableOpacity>
                    
// %                   </View>
// %                   </TouchableOpacity>
// %                 )}
// %               />
// %           </View>
// %         );
// %       } else if (pageType === "Edit" && value === 'Routine') {
// %         return (
// %           <View style={styles.container}>
// %               <FlatList
// %                 ref={flatListRef}
// %                 data={customRoutines}
// %                 keyExtractor={(item) => item.name}
// %                 style={styles.flatList}
// %                 renderItem={({ item}) => ( 
// %                   <TouchableOpacity onPress={() => customRoutTapped(item)}>
// %                   <View style={styles.resultContainer}>

                      
// %                         <Text style={{fontWeight: 'bold'}}>{item.name}</Text>  

// %                         <AntDesign name="edit" size={width / 15} color="orange" />

// %                         <TouchableOpacity onPress={() => deleteCustomRoutine(item)} style={styles.touchableDelete}>
// %                         <MaterialIcons name="delete" size={width / 15} color="black" />
// %                       </TouchableOpacity>
                    
// %                   </View>
// %                   </TouchableOpacity>
// %                 )}
// %               />
// %           </View>
// %         );
// %       } else {
// %         return null;
// %       }
// %     };