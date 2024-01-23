 <div key={indexTitle} className="pr-[50px]">
                                    <div className="grid grid-cols-2">
                                        {dataCards[module].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).length > 0 ? (
                                            cards[title].filter(card => searchFilter !== "" ? normalizeString(card.toLowerCase()).includes(normalizeString(searchFilter.toLowerCase())) : card).map((card, indexCard) => (
                                                // <button key={indexCard} onClick={dataCards[card]?.[0]?.onClick}>
                                                //     <div className={`flex flex-col items-center justify-center w-[148px] h-[148px] transition ease-in-out delay-75 bg-[${titleColors[title].bg}] hover:bg-[${titleColors[title].hover}] hover:scale-105 shadow-xl mb-3 mr-4 rounded-xl text-lg font-semibold text-[${titleColors[title].text}] hover:text-white`}
                                                //         onMouseEnter={dataCards[card]?.[0]?.mouseEnter}
                                                //         onMouseLeave={dataCards[card]?.[0]?.mouseLeave}
                                                //     >
                                                //         {card}
                                                //         <img src={dataCards[card]?.[0]?.image} title={dataCards[card]?.[0]?.title} style={{ filter: dataCards[card]?.[0]?.filter }} />
                                                //     </div>
                                                // </button>
                                                
                                            ))
                                        ) : (
                                            <div className="w-[148px] mr-4"></div>
                                        )}
                                    </div>
                                </div>