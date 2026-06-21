const fs = require('fs');
const data = {
  pickup: [
    {
      date: '2026-06-22',
      country: '台灣',
      company: '中釉',
      passengers: '蔡竣翔、周書宇、江寅誠、廖庚奎、藍蔚賢、王嘉瑋、李佳峰、張仕賢、彭荻為、池紀慶',
      flight: 'CZ3098',
      time: '17:10',
      route: '白云机场➤安喜曼',
      leader: '藍蔚賢',
      bus: '22座',
      pax: 12
    },
    {
      date: '2026-06-22',
      country: '菲律賓',
      company: 'MARIWASA',
      passengers: 'LEAWPIROJ MR. BOONYARIT, AUNGERN MR. TAWEESAK',
      flight: '',
      time: '',
      route: '白云机场',
      leader: '',
      bus: '',
      pax: 2
    },
    {
      date: '2026-06-22',
      country: '馬來西亞',
      company: '白馬',
      passengers: '盧皓誠、吳炯中、陳朝鎮、黃力強、顏國梁',
      flight: 'CZ354',
      time: '20:00',
      route: '白云机场➤安喜曼',
      leader: '盧皓誠',
      bus: '15座',
      pax: 6
    },
    {
      date: '2026-06-23',
      country: '孟加拉',
      company: '中孟',
      passengers: '周書宇、鄒永德、Aminul Islam、MD.Altaf Hossain、Hridoy Abdul Kadir、Alindo Sarker',
      flight: 'CZ-392',
      time: '05:20',
      route: '安喜曼➤白云机场➤安喜曼',
      leader: '周書宇',
      bus: '15座',
      pax: 7
    },
    {
      date: '2026-06-23',
      country: '台灣',
      company: '中釉 / 華泰 / 統帥 / 裕邦',
      passengers: '中釉: 張文亮、周士薰、盧國智、鄭嘉慶、高進昇、蕭孳璇、陳秀珍、陸程偉 | 華泰: 林秋德 | 統帥: 許哲愷、王健帆 | 裕邦: 潘小蓮、王鳳吟、王美惠、林素如',
      flight: 'CZ3098',
      time: '17:10',
      route: '白云机场➤安喜曼',
      leader: '陸程偉',
      bus: '37座',
      pax: 15
    },
    {
      date: '2026-06-23',
      country: '孟加拉',
      company: 'Great Wall',
      passengers: '周書宇、Shekhor Chandra、MD Minhazur',
      flight: 'CZ-5016',
      time: '19:05',
      route: '安喜曼➤白云机场➤安喜曼',
      leader: '周書宇',
      bus: '4座',
      pax: 3
    }
  ],
  dropoff: [
    {
      date: '2026-06-27',
      country: '馬來西亞',
      company: '白馬',
      passengers: '吳炯中、陳朝鎮、黃力強、顏國梁',
      flight: '',
      time: '07:00',
      route: '安喜曼➤白云机场',
      leader: '',
      bus: '7座',
      pax: 4
    },
    {
      date: '2026-06-27',
      country: '台灣',
      company: '中釉 / 華泰',
      passengers: '中釉: 張文亮、周士薰、盧國智、廖庚奎、藍蔚賢、鄭嘉慶、盧皓誠、高進昇、王嘉瑋、陸程偉、彭荻為、池紀慶 | 華泰: 林秋德',
      flight: 'CZ3097',
      time: '11:00',
      route: '安喜曼➤白云机场',
      leader: '陸程偉',
      bus: '37座',
      pax: 15
    },
    {
      date: '2026-06-27',
      country: '孟加拉',
      company: '中孟',
      passengers: '鄒永德、Aminul Islam、MD.Altaf Hossain、Hridoy Abdul Kadir、Alindo Sarker、Shekhor Chandra、MD Minhazur',
      flight: 'CZ-391',
      time: '20:00',
      route: '安喜曼➤白云机场',
      leader: '周書宇',
      bus: '15座',
      pax: 7
    },
    {
      date: '2026-06-28',
      country: '台灣',
      company: '中釉',
      passengers: '蔡竣翔、周書宇、江寅誠、李佳峰、張仕賢',
      flight: 'CZ-3097',
      time: '11:00',
      route: '安喜曼➤白云机场',
      leader: '',
      bus: '15座',
      pax: 5
    }
  ],
  charter: [
    {
      date: '2026-06-23',
      country: '台灣',
      company: '中釉',
      passengers: '蔡竣翔、余姐、彭荻為、池紀慶',
      time: '09:00',
      route: '安喜曼➤佛辦➤會場',
      leader: '蔡竣翔',
      bus: '7座',
      pax: 4
    },
    {
      date: '2026-06-24',
      country: '全體',
      company: '全體',
      passengers: '全體人員',
      time: '09:00',
      route: '安喜曼➤會場➤安喜曼',
      leader: '陸程偉',
      bus: '49座2台',
      pax: 0
    },
    {
      date: '2026-06-25',
      country: '全體',
      company: '全體',
      passengers: '全體人員',
      time: '09:00',
      route: '安喜曼➤會場➤安喜曼',
      leader: '陸程偉',
      bus: '49座2台',
      pax: 0
    },
    {
      date: '2026-06-26',
      country: '全體',
      company: '全體',
      passengers: '全體人員',
      time: '09:00',
      route: '安喜曼➤會場➤安喜曼',
      leader: '廖庚奎',
      bus: '49座2台',
      pax: 0
    },
    {
      date: '2026-06-26',
      country: '台灣',
      company: '三洋',
      passengers: '陸程偉、陳宥任、陳建凱',
      time: '09:00',
      route: '安喜曼➤',
      leader: '陸程偉',
      bus: '7座',
      pax: 3
    }
  ]
};
fs.writeFileSync('src/data/transport.json', JSON.stringify(data, null, 2), 'utf8');
