// =====================================================
// MAYYOGA — Dữ liệu Tư thế Hatha Yoga
// 9 nhóm: Cúi gập | Uốn lưng | Nghiêng lườn | Vặn xoắn
//         Cơ bụng | Mở khớp | Thăng bằng | Đảo ngược | Thư giãn
// =====================================================

const POSE_CATEGORIES = [
  { id: 'cui-gap',     name: 'Cúi gập',      iconImg: 'assets/images/icons/icon3d-cui-gap.webp',      img: 'assets/images/poses/uttanasana.webp',          desc: 'Kéo giãn chuỗi cơ sau cơ thể, giải phóng cột sống, thư giãn hệ thần kinh' },
  { id: 'uon-lung',    name: 'Uốn lưng',     iconImg: 'assets/images/icons/icon3d-uon-lung.webp',     img: 'assets/images/poses/bhujangasana.webp',         desc: 'Mở rộng lồng ngực, tăng linh hoạt cột sống, tăng năng lượng' },
  { id: 'nghieng-luon',name: 'Nghiêng lườn', iconImg: 'assets/images/icons/icon3d-nghieng.webp',      img: 'assets/images/poses/trikonasana.webp',          desc: 'Kéo giãn hai bên thân và sườn, mở rộng phổi, cân bằng năng lượng' },
  { id: 'van-xoan',    name: 'Vặn xoắn',     iconImg: 'assets/images/icons/icon3d-van-xoan.webp',     img: 'assets/images/poses/ardha-matsyendrasana.webp', desc: 'Massage nội tạng, giải phóng căng thẳng cột sống, cải thiện tiêu hóa' },
  { id: 'co-bung',     name: 'Cơ bụng',      iconImg: 'assets/images/icons/icon3d-co-bung.webp',      img: 'assets/images/poses/navasana.webp',             desc: 'Tăng cường cốt lõi, ổn định cột sống lưng, xây dựng sức mạnh nội tâm' },
  { id: 'mo-khop',     name: 'Mở khớp',      iconImg: 'assets/images/icons/icon3d-mo-khop.webp',      img: 'assets/images/poses/baddha-konasana.webp',      desc: 'Mở hông và khớp háng, giải phóng căng thẳng vùng chậu, tăng linh hoạt' },
  { id: 'thang-bang',  name: 'Thăng bằng',   iconImg: 'assets/images/icons/icon3d-thang-bang.webp',   img: 'assets/images/poses/vrksasana.webp',            desc: 'Phát triển sự tập trung, ổn định thần kinh, tăng cường sức mạnh chân' },
  { id: 'dao-nguoc',   name: 'Đảo ngược',    iconImg: 'assets/images/icons/icon3d-dao-nguoc.webp',    img: 'assets/images/poses/setu-bandhasana.webp',      desc: 'Tăng tuần hoàn máu não, cải thiện bạch huyết, đảo ngược trọng lực' },
  { id: 'thu-gian',    name: 'Thư giãn',     iconImg: 'assets/images/icons/icon3d-thu-gian.webp',     img: 'assets/images/poses/savasana.webp',             desc: 'Phục hồi sâu, giảm stress, hợp nhất lợi ích từ toàn buổi tập' }
];

const POSES = [

  // ===== 1. CÚI GẬP — Forward Folds (6 tư thế) =====
  { cat: 'cui-gap', img: 'assets/images/poses/uttanasana.webp', vn: 'Đứng cúi người', san: 'Uttanasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sâu gân khoeo và bắp chân, giải phóng lưng dưới, giảm lo âu và đau đầu, kích thích gan và thận.',
    contra: 'Đau lưng dưới nặng (gập nhẹ hoặc gối cong), thoái hóa đĩa đệm, huyết áp cao.',
    howto: 'Đứng thẳng, thở ra gập toàn thân về phía trước từ khớp hông (không từ lưng). Tay chạm sàn hoặc nắm khuỷu tay, đầu thả lỏng.' },

  { cat: 'cui-gap', img: 'assets/images/poses/paschimottanasana.webp', vn: 'Ngồi cúi người', san: 'Paschimottanasana', level: 'Cơ bản',
    benefits: 'Kéo giãn toàn bộ mặt sau cơ thể từ gáy đến gót. Kích thích thận, gan, buồng trứng. Giảm căng thẳng, trầm cảm nhẹ.',
    contra: 'Hen suyễn, tiêu chảy, chấn thương lưng dưới — giữ cột sống thẳng hơn với gối đệm.',
    howto: 'Ngồi trên sàn hai chân duỗi thẳng. Hít vào kéo dài cột sống, thở ra cúi người về phía chân. Tay nắm cạnh bàn chân hoặc ống quyển.' },

  { cat: 'cui-gap', img: 'assets/images/poses/balasana.webp', vn: 'Tư thế Trẻ em', san: 'Balasana', level: 'Cơ bản',
    benefits: 'Kéo giãn hông, đùi và mắt cá. Thư giãn hệ thần kinh, giảm đau lưng và cổ, làm dịu tâm trí.',
    contra: 'Tiêu chảy, có thai (mở rộng đầu gối hơn), chấn thương đầu gối nặng.',
    howto: 'Quỳ gối, ngồi lùi về gót chân, cúi thân trên ra trước. Trán chạm sàn, hai tay duỗi thẳng trước hoặc để dọc thân.' },

  { cat: 'cui-gap', img: 'assets/images/poses/ardha-uttanasana.webp', vn: 'Nửa gập người', san: 'Ardha Uttanasana', level: 'Cơ bản',
    benefits: 'Kéo giãn và giải phóng căng thẳng ở cột sống và gân khoeo. Cải thiện tư thế, chuẩn bị thân nhiệt cho gập sâu.',
    contra: 'Chấn thương cổ (đừng ngẩng gập cổ quá sâu), đau thắt lưng (hãy khuỵu nhẹ gối).',
    howto: 'Từ tư thế gập người, nâng nửa thân lên sao cho lưng phẳng song song mặt sàn. Tay chạm hờ cẳng chân hoặc để trên đùi.' },

  { cat: 'cui-gap', img: 'assets/images/poses/janu-sirsasana.webp', vn: 'Ngồi cúi người một chân', san: 'Janu Sirsasana', level: 'Cơ bản',
    benefits: 'Kéo giãn cột sống, vai và gân khoeo. Kích thích gan và thận. Cải thiện tiêu hóa, giảm lo âu.',
    contra: 'Tiêu chảy, chấn thương đầu gối — không gập gối cứng hoàn toàn.',
    howto: 'Ngồi một chân duỗi thẳng, chân kia co lại chân trong đùi đối diện. Hít vào kéo dài lưng, thở ra cúi về phía chân duỗi.' },

  { cat: 'cui-gap', img: 'assets/images/poses/prasarita-padottanasana.webp', vn: 'Dang hai chân cúi', san: 'Prasarita Padottanasana', level: 'Trung cấp',
    benefits: 'Kéo giãn đùi trong, bắp chân và cột sống. Làm dịu tinh thần. Tăng cường cơ thân dưới.',
    contra: 'Huyết áp thấp — đứng dậy từ từ. Chấn thương lưng dưới.',
    howto: 'Đứng hai chân mở rộng 1–1.2m. Tay đặt eo, hít vào, thở ra gập người về trước. Hai tay chống sàn hoặc nắm mắt cá.' },

  { cat: 'cui-gap', img: 'assets/images/poses/padahastasana.webp', vn: 'Tay dưới bàn chân', san: 'Padahastasana', level: 'Trung cấp',
    benefits: 'Kéo giãn sâu gân khoeo, bắp chân và cổ tay. Kích thích gan và thận. Massage nội tạng bụng khi gập sâu.',
    contra: 'Chấn thương lưng dưới, huyết áp cao, thoát vị đĩa đệm.',
    howto: 'Đứng thẳng, gập người về phía trước. Luồn hai tay dưới lòng bàn chân, ngón tay hướng về gót. Kéo ngực về phía đầu gối.' },

  { cat: 'cui-gap', img: 'assets/images/poses/upavista-konasana.webp', vn: 'Ngồi dang chân gập', san: 'Upavistha Konasana', level: 'Trung cấp',
    benefits: 'Kéo giãn sâu đùi trong, gân khoeo và bẹn. Kích thích nội tạng bụng. Làm dịu hệ thần kinh.',
    contra: 'Chấn thương lưng dưới — giữ cột sống thẳng, không ép gập quá sâu.',
    howto: 'Ngồi hai chân mở rộng sang hai bên. Hít vào kéo dài cột sống, thở ra gập người về trước, tay với ra phía trước trên sàn.' },

  { cat: 'cui-gap', img: 'assets/images/poses/parsvottanasana.webp', vn: 'Tư thế Kim tự tháp', san: 'Parsvottanasana', level: 'Trung cấp',
    benefits: 'Kéo giãn cột sống, vai, cổ tay và gân khoeo. Cải thiện tư thế và thăng bằng. Kích thích tiêu hóa.',
    contra: 'Huyết áp cao, chấn thương gân khoeo hoặc lưng dưới.',
    howto: 'Đứng một chân trước, một chân sau (cách ~1m). Tay chắp sau lưng (reverse prayer). Gập thân trên về phía chân trước.' },

  { cat: 'cui-gap', img: 'assets/images/poses/kurmasana.webp', vn: 'Tư thế Rùa', san: 'Kurmasana', level: 'Nâng cao',
    benefits: 'Kéo giãn rất sâu cột sống, vai và gân khoeo. Kích thích tim và phổi. Thư giãn hệ thần kinh, giảm đau đầu.',
    contra: 'Chấn thương cột sống, vai hoặc hông. Thoát vị đĩa đệm. Thai kỳ.',
    howto: 'Ngồi hai chân mở rộng, gối hơi cong. Gập người về trước, luồn hai tay dưới đầu gối ra hai bên. Ngực hạ dần xuống sàn.' },

  // ===== 2. UỐN LƯNG — Backbends (10 tư thế) =====
  { cat: 'uon-lung', img: 'assets/images/poses/bhujangasana.webp', vn: 'Tư thế Rắn hổ mang', san: 'Bhujangasana', level: 'Cơ bản',
    benefits: 'Tăng cường cơ lưng, mở ngực và phổi, kích thích nội tạng bụng, thư giãn lưng dưới, nâng cao tâm trạng.',
    contra: 'Hội chứng ống cổ tay, chấn thương lưng, thai kỳ.',
    howto: 'Nằm sấp, tay đặt dưới vai. Hít vào nâng ngực và đầu lên. Khuỷu tay hơi cong, vai kéo xuống và ra sau.' },

  { cat: 'uon-lung', img: 'assets/images/poses/setu-bandhasana.webp', vn: 'Tư thế Cầu', san: 'Setu Bandha Sarvangasana', level: 'Cơ bản',
    benefits: 'Mở ngực, cổ và cột sống. Tăng cường cơ đùi sau và cơ mông. Kích thích tuyến giáp, giảm lo âu.',
    contra: 'Chấn thương cổ — giữ cổ không xoay khi trong tư thế.',
    howto: 'Nằm ngửa, gập gối đặt lòng bàn chân sàn gần mông. Hít vào nâng hông lên, hai tay đặt dưới lưng hoặc song song thân.' },

  { cat: 'uon-lung', img: 'assets/images/poses/ustrasana.webp', vn: 'Tư thế Lạc đà', san: 'Ustrasana', level: 'Trung cấp',
    benefits: 'Kéo giãn toàn bộ mặt trước cơ thể, cột sống và cổ họng. Tăng cường cơ lưng. Mở tim, tăng năng lượng.',
    contra: 'Huyết áp thấp hoặc cao, đau đầu, mất ngủ, chấn thương lưng dưới hoặc cổ.',
    howto: 'Quỳ gối, hông rộng bằng vai. Tay đặt lưng dưới hoặc nắm gót chân. Nâng ngực lên, đầu thả nhẹ ra sau.' },

  { cat: 'uon-lung', img: 'assets/images/poses/salabhasana.webp', vn: 'Tư thế Châu chấu', san: 'Salabhasana', level: 'Cơ bản',
    benefits: 'Tăng cường cơ lưng toàn bộ, cơ mông và cơ chân. Kích thích nội tạng bụng. Giảm đau lưng mãn tính.',
    contra: 'Thai kỳ, chấn thương lưng nặng, đau đầu.',
    howto: 'Nằm sấp, hai tay xuôi thân hoặc dưới bụng. Hít vào nâng chân (hoặc cả thân trên) lên khỏi sàn, giữ chân thẳng.' },

  { cat: 'uon-lung', img: 'assets/images/poses/dhanurasana.webp', vn: 'Tư thế Cánh cung', san: 'Dhanurasana', level: 'Trung cấp',
    benefits: 'Kéo giãn toàn bộ mặt trước cơ thể. Tăng cường cơ lưng. Kích thích cơ quan sinh sản và tuyến thượng thận.',
    contra: 'Huyết áp cao hoặc thấp, đau nửa đầu, mất ngủ, thai kỳ.',
    howto: 'Nằm sấp, gập gối. Tay với ra sau nắm mắt cá chân. Hít vào nâng ngực và chân lên cùng lúc, cơ thể như hình cánh cung.' },

  { cat: 'uon-lung', img: 'assets/images/poses/matsyasana.webp', vn: 'Tư thế Cá', san: 'Matsyasana', level: 'Cơ bản',
    benefits: 'Mở ngực và cổ họng, kéo giãn cơ gian sườn. Kích thích tuyến giáp và cận giáp. Giảm căng thẳng cổ vai.',
    contra: 'Huyết áp cao hoặc thấp, đau nửa đầu, mất ngủ, chấn thương cổ.',
    howto: 'Nằm ngửa, tay đặt dưới mông. Hít vào nâng ngực lên, đầu thả nhẹ ra sau chạm sàn nhẹ nhàng.' },

  { cat: 'uon-lung', img: 'assets/images/poses/urdhva-mukha-svanasana.webp', vn: 'Chó ngửa mặt', san: 'Urdhva Mukha Svanasana', level: 'Cơ bản',
    benefits: 'Mở rộng ngực và phổi. Tăng cường cánh tay, cổ tay và cột sống. Kích thích nội tạng bụng. Giảm trầm cảm nhẹ.',
    contra: 'Hội chứng ống cổ tay, đau đầu, thai kỳ, chấn thương lưng.',
    howto: 'Nằm sấp, hai tay đặt cạnh ngực. Hít vào ấn tay nâng toàn thân lên, hông và đùi rời khỏi sàn. Mu bàn chân ấn sàn.' },

  { cat: 'uon-lung', img: 'assets/images/poses/urdhva-dhanurasana.webp', vn: 'Tư thế Bánh xe', san: 'Urdhva Dhanurasana', level: 'Nâng cao',
    benefits: 'Kéo giãn toàn bộ mặt trước cơ thể. Tăng cường cánh tay, chân, bụng và cột sống. Kích thích tuyến giáp và yên.',
    contra: 'Đau đầu, tiêu chảy, huyết áp cao hoặc thấp, chấn thương cổ tay hoặc lưng.',
    howto: 'Nằm ngửa, gập gối đặt bàn chân sàn. Tay đặt cạnh đầu, ngón hướng vai. Hít vào đẩy toàn thân lên thành hình cầu vồng.' },

  { cat: 'uon-lung', img: 'assets/images/poses/anjaneyasana.webp', vn: 'Tư thế Trăng lưỡi liềm', san: 'Anjaneyasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sâu cơ gấp hông, đùi trước và bẹn. Mở ngực và vai. Tăng năng lượng và sự tự tin.',
    contra: 'Chấn thương đầu gối — kê đệm dưới gối sau. Huyết áp cao — không giơ tay quá cao.',
    howto: 'Từ Lunge, hạ gối sau xuống sàn. Gối trước gập 90°. Hai tay vươn lên trời, nhẹ nhàng uốn lưng.' },

  { cat: 'uon-lung', img: 'assets/images/poses/supta-virasana.webp', vn: 'Anh hùng nằm ngửa', san: 'Supta Virasana', level: 'Trung cấp',
    benefits: 'Kéo giãn sâu đùi trước, mắt cá và bụng. Cải thiện tiêu hóa. Giảm mệt mỏi chân sau đứng lâu.',
    contra: 'Chấn thương đầu gối hoặc mắt cá — ngồi trên gối đệm, không ép nằm hoàn toàn.',
    howto: 'Từ Virasana, từ từ nằm ngửa ra sau, dùng khuỷu tay đỡ. Tay đặt xuôi thân hoặc vươn qua đầu.' },

  // ===== 3. NGHIÊNG LƯỜN — Lateral Bends (10 tư thế) =====
  { cat: 'nghieng-luon', img: 'assets/images/poses/trikonasana.webp', vn: 'Tư thế Tam giác', san: 'Trikonasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sâu hông, bẹn, gân khoeo và sườn. Mở rộng ngực và vai. Tăng cường cơ chân, giảm stress.',
    contra: 'Tiêu chảy, đau đầu, huyết áp thấp, chấn thương cổ — mắt nhìn thẳng.',
    howto: 'Hai chân mở rộng, bàn chân trước quay 90°. Tay trước hạ xuống chạm ống chân hoặc sàn, tay sau vươn thẳng lên trời.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/ardha-chandrasana.webp', vn: 'Tư thế Bán nguyệt', san: 'Ardha Chandrasana', level: 'Trung cấp',
    benefits: 'Kéo giãn sườn, cột sống và đùi trong. Tăng cường thăng bằng. Mở hông và ngực sang bên.',
    contra: 'Đau đầu, huyết áp thấp, tiêu chảy, mất ngủ.',
    howto: 'Từ Tam giác, chuyển trọng lượng lên chân trước, nâng chân sau song song sàn. Tay trên vươn lên trời, thân mở sang bên.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/utthita-parsvakonasana.webp', vn: 'Tư thế Góc mở rộng', san: 'Utthita Parsvakonasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sườn, bẹn và đùi trong. Tăng cường chân và cột sống. Kích thích tiêu hóa.',
    contra: 'Đau đầu, huyết áp thấp hoặc cao.',
    howto: 'Từ Chiến binh II, tay trước tựa khuỷu lên đùi hoặc sàn. Tay sau vươn qua đầu tạo đường thẳng từ bàn chân đến ngón tay.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/nitambhasana.webp', vn: 'Nghiêng sườn đứng', san: 'Nitambhasana', level: 'Cơ bản',
    benefits: 'Kéo giãn cơ gian sườn và cạnh thân, giải phóng căng thẳng lưng bên, mở rộng dung tích phổi.',
    contra: 'Huyết áp thấp, chóng mặt.',
    howto: 'Đứng thẳng, một tay lên trên đầu, nghiêng người sang bên đối diện. Hông không được lệch ra ngoài.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/parighasana.webp', vn: 'Cổng vòm', san: 'Parighasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sâu cạnh thân, cơ gian sườn và hông. Tăng linh hoạt cột sống sang hai bên.',
    contra: 'Chấn thương đầu gối — dùng tấm đỡ dưới gối.',
    howto: 'Quỳ một gối, duỗi chân còn lại sang bên. Một tay đặt lên chân duỗi, tay kia vươn qua đầu theo hướng chân duỗi.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/parivrtta-janu-sirsasana.webp', vn: 'Nghiêng lườn ngồi', san: 'Parivrtta Janu Sirsasana', level: 'Trung cấp',
    benefits: 'Kéo giãn sâu cạnh thân, vai và gân khoeo. Kích thích gan và thận. Cải thiện tiêu hóa.',
    contra: 'Tiêu chảy, chấn thương đầu gối hoặc lưng dưới.',
    howto: 'Ngồi một chân duỗi, chân kia co. Nghiêng thân về phía chân duỗi, tay trên vươn qua đầu nắm bàn chân. Mở ngực lên trần.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/anantasana.webp', vn: 'Tư thế Vishnu nằm', san: 'Anantasana', level: 'Trung cấp',
    benefits: 'Kéo giãn đùi trong và gân khoeo. Tăng cường cơ bụng bên. Cải thiện thăng bằng khi nằm nghiêng.',
    contra: 'Chấn thương cổ, vai hoặc gân khoeo.',
    howto: 'Nằm nghiêng, đầu tựa lên tay dưới. Nâng chân trên lên thẳng, tay trên nắm ngón chân cái. Giữ thăng bằng.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/parsva-sukhasana.webp', vn: 'Nghiêng lườn ngồi thiền', san: 'Parsva Sukhasana', level: 'Cơ bản',
    benefits: 'Kéo giãn nhẹ cơ gian sườn và vai. Mở rộng lồng ngực. Dễ tiếp cận cho người mới bắt đầu.',
    contra: 'Chấn thương vai — giảm biên độ.',
    howto: 'Ngồi xếp bằng, một tay chống sàn bên cạnh. Tay kia vươn lên và cong qua đầu, nghiêng nhẹ sang bên tay chống.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/viparita-virabhadrasana.webp', vn: 'Chiến binh đảo ngược', san: 'Viparita Virabhadrasana', level: 'Cơ bản',
    benefits: 'Kéo giãn sâu cạnh thân và vai. Mở ngực. Tăng cường chân. Kết hợp sức mạnh và linh hoạt.',
    contra: 'Chấn thương vai, cổ hoặc đầu gối.',
    howto: 'Từ Chiến binh II, giữ gối trước cong. Nghiêng thân về phía sau, tay trước vươn lên trời, tay sau trượt xuống chân sau.' },

  { cat: 'nghieng-luon', img: 'assets/images/poses/ardha-kati-chakrasana.webp', vn: 'Nghiêng lườn đứng', san: 'Ardha Kati Chakrasana', level: 'Cơ bản',
    benefits: 'Kéo giãn cơ gian sườn, cải thiện tư thế. Tăng linh hoạt cột sống bên. Phù hợp khởi động.',
    contra: 'Huyết áp thấp, chóng mặt.',
    howto: 'Đứng thẳng hai chân chụm. Một tay giữ eo, tay kia vươn lên trời. Nghiêng thân sang bên tay giữ eo, hông giữ thẳng.' },

  // ===== 4. VẶN XOẮN — Twists (10 tư thế) =====
  { cat: 'van-xoan', img: 'assets/images/poses/ardha-matsyendrasana.webp', vn: 'Vặn xoắn ngồi', san: 'Ardha Matsyendrasana', level: 'Trung cấp',
    benefits: 'Tăng linh hoạt cột sống, massage thận và gan, kích thích tiêu hóa, giảm mệt mỏi và đau lưng.',
    contra: 'Thai kỳ, chấn thương cột sống, thoát vị đĩa đệm — chỉ xoắn nhẹ.',
    howto: 'Ngồi, gập một chân, đặt bàn chân qua chân kia. Tay đối diện tựa khuỷu vào đầu gối. Xoắn thân từ đáy cột sống.' },

  { cat: 'van-xoan', img: 'assets/images/poses/parivrtta-trikonasana.webp', vn: 'Tam giác xoay', san: 'Parivrtta Trikonasana', level: 'Trung cấp',
    benefits: 'Tăng cường cơ bụng và lưng, kích thích tiêu hóa, cải thiện thăng bằng và sự tập trung.',
    contra: 'Huyết áp thấp, đau nửa đầu, tiêu chảy, mất ngủ.',
    howto: 'Từ tư thế đứng, tay đối diện chạm sàn cạnh chân trước, tay sau vươn lên. Giữ hông song song sàn.' },

  { cat: 'van-xoan', img: 'assets/images/poses/parivrtta-parsvakonasana.webp', vn: 'Chiến binh xoay', san: 'Parivrtta Parsvakonasana', level: 'Trung cấp',
    benefits: 'Tăng cường chân và cột sống, kích thích tiêu hóa, cải thiện thăng bằng. Kéo giãn sâu lưng và hông.',
    contra: 'Huyết áp thấp hoặc cao, đau đầu, mất ngủ.',
    howto: 'Từ Lunge thấp, xoay thân, khuỷu tay đối diện tựa đầu gối. Tay trên vươn qua đầu tạo đường dài.' },

  { cat: 'van-xoan', img: 'assets/images/poses/supta-matsyendrasana.webp', vn: 'Xoắn nằm ngửa', san: 'Supta Matsyendrasana', level: 'Cơ bản',
    benefits: 'Massage nhẹ nội tạng bụng, giải phóng căng cột sống và hông, kéo giãn vai và cổ. Thư giãn sâu.',
    contra: 'Đau lưng dưới — giảm biên độ xoắn.',
    howto: 'Nằm ngửa, kéo một đầu gối qua bên đối diện. Tay cùng bên giang thẳng, đầu quay nhẹ hướng tay đó.' },

  { cat: 'van-xoan', img: 'assets/images/poses/bharadvajasana.webp', vn: 'Xoắn ngồi đơn giản', san: 'Bharadvajasana', level: 'Cơ bản',
    benefits: 'Dịu nhẹ cho cột sống, vai và cổ. Kích thích nội tạng bụng. Phù hợp người đau lưng nhẹ.',
    contra: 'Tiêu chảy, nhức đầu, huyết áp thấp hoặc cao.',
    howto: 'Ngồi, hai chân để một bên phải (hoặc trái). Xoay thân về phía trái, tay phải đặt lên đầu gối trái, tay trái ra sau tựa sàn.' },

  { cat: 'van-xoan', img: 'assets/images/poses/parivrtta-balasana.webp', vn: 'Xoắn tứ chi', san: 'Parivrtta Balasana', level: 'Cơ bản',
    benefits: 'Giải phóng căng thẳng lưng trên và vai, xoắn nhẹ cột sống ngực, thích hợp khởi động.',
    contra: 'Chấn thương vai hoặc cổ tay.',
    howto: 'Từ Tứ chi (bò), luồn một tay qua sàn sang bên đối diện. Vai và má chạm sàn. Tay trên có thể vươn lên trời.' },

  { cat: 'van-xoan', img: 'assets/images/poses/parivrtta-anjaneyasana.webp', vn: 'Lunge xoắn', san: 'Parivrtta Anjaneyasana', level: 'Trung cấp',
    benefits: 'Kéo giãn cơ gấp hông và đùi trước. Xoắn sâu cột sống, kích thích tiêu hóa. Tăng cường thăng bằng và sức mạnh chân.',
    contra: 'Chấn thương đầu gối, lưng dưới hoặc cổ. Huyết áp thấp.',
    howto: 'Từ Lunge thấp, chắp tay trước ngực. Xoắn thân sang bên, khuỷu tay đối diện móc vào ngoài đầu gối trước. Nhìn lên trần.' },

  { cat: 'van-xoan', img: 'assets/images/poses/parivrtta-utkatasana.webp', vn: 'Ghế xoay', san: 'Parivrtta Utkatasana', level: 'Trung cấp',
    benefits: 'Tăng cường chân, cốt lõi và cột sống. Kích thích tiêu hóa. Giải độc nhẹ nhàng qua massage nội tạng.',
    contra: 'Huyết áp thấp, đau đầu, mất ngủ, chấn thương đầu gối.',
    howto: 'Từ Utkatasana (ghế), chắp tay trước ngực. Xoay thân sang một bên, khuỷu tay đặt ngoài đầu gối đối diện.' },

  { cat: 'van-xoan', img: 'assets/images/poses/eka-pada-koundinyasana.webp', vn: 'Cân bằng tay xoắn', san: 'Eka Pada Koundinyasana II', level: 'Nâng cao',
    benefits: 'Tăng cường cổ tay, cánh tay và cốt lõi. Kết hợp xoắn sâu với cân bằng tay. Phát triển sức mạnh và sự tự tin.',
    contra: 'Hội chứng ống cổ tay, chấn thương vai hoặc cổ tay, thai kỳ.',
    howto: 'Từ tư thế Chaturanga, xoắn thân đặt một đùi lên cánh tay. Duỗi chân đó sang bên, chân kia duỗi thẳng ra sau. Nâng toàn thân khỏi sàn.' },

  { cat: 'van-xoan', img: 'assets/images/poses/katichakrasana.webp', vn: 'Xoắn cột sống đứng', san: 'Katichakrasana', level: 'Cơ bản',
    benefits: 'Làm linh hoạt cột sống, giảm cứng lưng. Kích thích tiêu hóa. Phù hợp khởi động trước buổi tập.',
    contra: 'Thoát vị đĩa đệm, đau lưng cấp tính.',
    howto: 'Đứng hai chân rộng bằng vai. Xoay thân sang bên, tay đối diện đặt lên vai, tay cùng bên quấn ra sau lưng. Đổi bên.' },

  // ===== 5. CƠ BỤNG — Core (10 tư thế) =====
  { cat: 'co-bung', img: 'assets/images/poses/navasana.webp', vn: 'Tư thế Thuyền', san: 'Navasana', level: 'Trung cấp',
    benefits: 'Tăng cường mạnh cơ bụng sâu (transversus abdominis), cơ gấp hông và cột sống. Cải thiện tiêu hóa.',
    contra: 'Hen suyễn, tiêu chảy, đau đầu, tim yếu, mất ngủ, huyết áp thấp, thai kỳ.',
    howto: 'Ngồi, nâng hai chân lên 45°, hai tay duỗi về phía trước song song sàn. Thân và chân tạo hình chữ V, lưng thẳng.' },

  { cat: 'co-bung', img: 'assets/images/poses/phalakasana.webp', vn: 'Tư thế Tấm ván', san: 'Phalakasana', level: 'Cơ bản',
    benefits: 'Tăng cường toàn bộ cốt lõi, vai và cánh tay. Cải thiện tư thế, tăng sức bền.',
    contra: 'Hội chứng ống cổ tay, đau vai cấp tính.',
    howto: 'Chống hai tay xuống sàn (hoặc khuỷu tay), hai chân duỗi thẳng ra sau. Cơ thể thẳng như tấm ván từ đầu đến gót.' },

  { cat: 'co-bung', img: 'assets/images/poses/vasisthasana.webp', vn: 'Tấm ván bên', san: 'Vasisthasana', level: 'Trung cấp',
    benefits: 'Tăng cường cơ bụng bên (obliques), cổ tay và vai. Cải thiện thăng bằng và sự tập trung.',
    contra: 'Hội chứng ống cổ tay, chấn thương vai hoặc mắt cá.',
    howto: 'Từ Tấm ván, xoay người sang bên, một tay chống sàn, tay kia vươn lên trời. Cơ thể thẳng hàng.' },

  { cat: 'co-bung', img: 'assets/images/poses/jathara-parivartanasana.webp', vn: 'Hạ lưng từng bên', san: 'Jathara Parivartanasana', level: 'Cơ bản',
    benefits: 'Tăng cường cơ bụng chéo và cơ thắt lưng, massage nhẹ cột sống, giảm đau lưng dưới.',
    contra: 'Chấn thương cột sống lưng cấp tính.',
    howto: 'Nằm ngửa, nâng hai chân thẳng lên trên. Từ từ hạ chân sang phải (không chạm sàn), giữ, rồi đổi bên.' },

  { cat: 'co-bung', img: 'assets/images/poses/purvottanasana.webp', vn: 'Tấm ván ngửa', san: 'Purvottanasana', level: 'Trung cấp',
    benefits: 'Nâng cao sức mạnh cốt lõi, cơ lưng, cánh tay và cổ tay. Kéo giãn chuyên sâu mặt trước cơ thể (ngực, vai, đùi).',
    contra: 'Chấn thương cổ tay, chấn thương cổ (giữ đầu thẳng thay vì thả ngửa).',
    howto: 'Ngồi thẳng chân. Đặt hai tay phía sau hông. Hít vào, ấn gót và tay xuống sàn, nâng hông lên cao thành một đường thẳng.' },

  { cat: 'co-bung', img: 'assets/images/poses/chaturanga-dandasana-v2.webp', vn: 'Chống đẩy thấp', san: 'Chaturanga Dandasana', level: 'Trung cấp',
    benefits: 'Tăng cường toàn bộ cốt lõi, tay, vai và cổ tay. Xây dựng sức bền. Chuẩn bị cho tư thế cân bằng tay.',
    contra: 'Hội chứng ống cổ tay, chấn thương vai, thai kỳ.',
    howto: 'Từ Tấm ván, hạ thân xuống giữ cách sàn vài cm. Khuỷu tay cong 90° sát sườn. Giữ cơ thể thẳng.' },

  { cat: 'co-bung', img: 'assets/images/poses/utkatasana-v2.webp', vn: 'Tư thế Ghế', san: 'Utkatasana', level: 'Cơ bản',
    benefits: 'Tăng cường đùi, mông, bắp chân và cốt lõi. Kéo giãn vai và ngực. Kích thích tim và cơ hoành.',
    contra: 'Huyết áp thấp, đau đầu, mất ngủ, chấn thương đầu gối.',
    howto: 'Đứng thẳng, gập gối như ngồi ghế vô hình. Đùi gần song song sàn. Hai tay vươn thẳng lên trời.' },

  { cat: 'co-bung', img: 'assets/images/poses/bakasana-v2.webp', vn: 'Tư thế Quạ', san: 'Bakasana', level: 'Nâng cao',
    benefits: 'Tăng cường mạnh cổ tay, cánh tay và cốt lõi. Cải thiện thăng bằng và tập trung. Xây dựng sự tự tin.',
    contra: 'Hội chứng ống cổ tay, thai kỳ, chấn thương vai.',
    howto: 'Ngồi xổm, hai tay chống sàn rộng bằng vai. Gối tựa lên mặt sau cánh tay. Nghiêng về trước, nâng chân khỏi sàn.' },

  { cat: 'co-bung', img: 'assets/images/poses/tolasana.webp', vn: 'Tư thế Cân', san: 'Tolasana', level: 'Nâng cao',
    benefits: 'Tăng cường cánh tay, vai và cốt lõi. Cải thiện sức mạnh nắm tay. Phát triển kiểm soát cơ thể.',
    contra: 'Chấn thương cổ tay, vai hoặc đầu gối. Hông cứng.',
    howto: 'Ngồi xếp bằng (hoặc Padmasana), hai tay đặt sàn cạnh hông. Ấn mạnh tay, nâng toàn thân rời sàn. Giữ 5–10 giây.' },

  { cat: 'co-bung', img: 'assets/images/poses/ardha-navasana.webp', vn: 'Nửa thuyền', san: 'Ardha Navasana', level: 'Cơ bản',
    benefits: 'Tăng cường cơ bụng dưới và cơ gấp hông. Dễ tiếp cận hơn Navasana đầy đủ. Xây dựng nền tảng cốt lõi.',
    contra: 'Đau lưng dưới cấp tính, thai kỳ.',
    howto: 'Ngồi, gập gối, nâng chân lên ống quyển song song sàn. Tay duỗi về phía trước ngang đầu gối. Lưng thẳng.' },

  // ===== 6. MỞ KHỚP — Hip Openers (10 tư thế) =====
  { cat: 'mo-khop', img: 'assets/images/poses/baddha-konasana.webp', vn: 'Tư thế Bướm', san: 'Baddha Konasana', level: 'Cơ bản',
    benefits: 'Kéo giãn hông, bẹn và đùi trong. Kích thích tim và tuần hoàn. Giảm mệt mỏi và lo âu.',
    contra: 'Chấn thương bẹn hoặc đầu gối — kê gối đệm dưới đùi.',
    howto: 'Ngồi, hai lòng bàn chân áp vào nhau, gối mở sang hai bên tự nhiên. Cầm bàn chân, cột sống thẳng và thở sâu.' },

  { cat: 'mo-khop', img: 'assets/images/poses/padmasana.webp', vn: 'Tư thế Hoa Sen', san: 'Padmasana', level: 'Nâng cao',
    benefits: 'Mở sâu hông và khớp háng, thiết lập nền tảng vững chắc cho thiền định. Kéo giãn mắt cá và đầu gối.',
    contra: 'Chấn thương mắt cá hoặc đầu gối — không ép khi hông chưa đủ mở.',
    howto: 'Ngồi, đặt lần lượt từng bàn chân lên đùi đối diện, mặt bàn chân hướng lên. Cột sống thẳng, tay đặt mudra.' },

  { cat: 'mo-khop', img: 'assets/images/poses/eka-pada-rajakapotasana.webp', vn: 'Tư thế Bồ câu', san: 'Eka Pada Rajakapotasana', level: 'Trung cấp',
    benefits: 'Mở sâu hông ngoài và bẹn. Kéo giãn cơ mông và cơ piriformis. Giảm đau thần kinh tọa.',
    contra: 'Chấn thương đầu gối, mắt cá hoặc hông — điều chỉnh biên độ.',
    howto: 'Từ Chó úp mặt, đưa chân trái ra trước gập gối để trước thân. Chân phải duỗi thẳng ra sau. Cột sống thẳng hoặc cúi người.' },

  { cat: 'mo-khop', img: 'assets/images/poses/virasana.webp', vn: 'Tư thế Anh hùng', san: 'Virasana', level: 'Cơ bản',
    benefits: 'Kéo giãn đùi trước, đầu gối và mắt cá. Cải thiện tiêu hóa. Giảm mệt mỏi chân và phù sau đứng lâu.',
    contra: 'Chấn thương đầu gối hoặc mắt cá — ngồi trên gối đệm giữa hai chân.',
    howto: 'Quỳ gối, hai chân mở hơn hông. Ngồi chậm xuống giữa hai gót chân. Cột sống thẳng, tay đặt đùi.' },

  { cat: 'mo-khop', img: 'assets/images/poses/malasana.webp', vn: 'Tư thế Ngồi xổm', san: 'Malasana', level: 'Cơ bản',
    benefits: 'Mở rộng hông, háng và lưng dưới. Kích thích tiêu hóa. Tăng linh hoạt mắt cá chân.',
    contra: 'Chấn thương đầu gối, lưng dưới — kê gối dưới gót.',
    howto: 'Ngồi xổm hai chân rộng bằng vai. Khuỷu tay chống vào mặt trong đầu gối, tay chắp lại trước ngực, lưng thẳng.' },

  { cat: 'mo-khop', img: 'assets/images/poses/ananda-balasana.webp', vn: 'Em bé vui vẻ', san: 'Ananda Balasana', level: 'Cơ bản',
    benefits: 'Giải phóng hông và lưng dưới, kéo giãn nội hông và bẹn. Nhẹ nhàng massage cột sống. Thư giãn sâu.',
    contra: 'Thai kỳ, chấn thương đầu gối hoặc hông nặng.',
    howto: 'Nằm ngửa, gập gối lên ngực. Tay nắm cạnh ngoài bàn chân, kéo gối về phía nách. Lưng luôn áp sàn.' },

  { cat: 'mo-khop', img: 'assets/images/poses/gomukhasana.webp', vn: 'Tư thế Mặt bò', san: 'Gomukhasana', level: 'Trung cấp',
    benefits: 'Mở sâu vai, hông và ngực. Kéo giãn cơ tam đầu, cơ lưng và mắt cá. Giảm căng thẳng và lo âu.',
    contra: 'Chấn thương vai, đầu gối hoặc hông — dùng dây đai nếu tay không nắm được.',
    howto: 'Ngồi, xếp đầu gối chồng lên nhau. Tay trên vươn qua đầu và gập khuỷu, tay dưới luồn sau lưng lên. Nắm tay phía sau.' },

  { cat: 'mo-khop', img: 'assets/images/poses/supta-padangusthasana.webp', vn: 'Nằm nắm ngón chân', san: 'Supta Padangusthasana', level: 'Cơ bản',
    benefits: 'Kéo giãn gân khoeo và bắp chân an toàn khi nằm. Giảm đau lưng dưới. Cải thiện linh hoạt chân.',
    contra: 'Huyết áp cao — giữ đầu thấp. Chấn thương gân khoeo — dùng dây đai.',
    howto: 'Nằm ngửa, nâng một chân lên thẳng. Tay nắm ngón chân cái (hoặc dùng dây đai). Chân còn lại ấn sàn.' },

  { cat: 'mo-khop', img: 'assets/images/poses/agnistambhasana.webp', vn: 'Tư thế Khúc gỗ lửa', san: 'Agnistambhasana', level: 'Trung cấp',
    benefits: 'Mở sâu hông ngoài và cơ piriformis. Kéo giãn bẹn và đùi trong. Giảm đau thần kinh tọa.',
    contra: 'Chấn thương đầu gối — không ép gối xuống.',
    howto: 'Ngồi, xếp hai ống chân chồng lên nhau (mắt cá trên đầu gối dưới). Gập nhẹ về trước để tăng độ kéo giãn.' },

  { cat: 'mo-khop', img: 'assets/images/poses/hanumanasana.webp', vn: 'Tư thế Xẻ dọc', san: 'Hanumanasana', level: 'Nâng cao',
    benefits: 'Kéo giãn tối đa gân khoeo, đùi trước và cơ gấp hông. Kích thích nội tạng bụng. Tăng linh hoạt toàn diện.',
    contra: 'Chấn thương gân khoeo, bẹn hoặc hông — không ép, dùng khối yoga đỡ.',
    howto: 'Từ Lunge, trượt chân trước về phía trước và chân sau ra phía sau. Dùng tay hoặc khối yoga đỡ cho đến khi thoải mái.' },

  // ===== 7. THĂNG BẰNG — Balance (10 tư thế) =====
  { cat: 'thang-bang', img: 'assets/images/poses/vrksasana.webp', vn: 'Tư thế Cây', san: 'Vrksasana', level: 'Cơ bản',
    benefits: 'Cải thiện thăng bằng và sự tập trung. Tăng cường cơ chân và hông. Giúp tĩnh tâm, giảm lo âu.',
    contra: 'Đau đầu, mất ngủ, huyết áp thấp.',
    howto: 'Đứng thẳng, nâng một chân lên đặt lòng bàn chân vào đùi hoặc bắp chân (không đặt trực tiếp lên gối). Hai tay chắp hoặc vươn lên.' },

  { cat: 'thang-bang', img: 'assets/images/poses/garudasana.webp', vn: 'Tư thế Đại bàng', san: 'Garudasana', level: 'Trung cấp',
    benefits: 'Tăng cường đùi, mắt cá và bắp chân. Kéo giãn vai và cơ rhomboid. Cải thiện tập trung và thăng bằng.',
    contra: 'Chấn thương đầu gối, mắt cá hoặc khuỷu tay.',
    howto: 'Đứng, quấn chân phải qua trái, bàn chân móc vào bắp chân. Hai tay quấn vào nhau trước mặt, nâng khuỷu tay lên.' },

  { cat: 'thang-bang', img: 'assets/images/poses/natarajasana.webp', vn: 'Tư thế Vũ sĩ', san: 'Natarajasana', level: 'Nâng cao',
    benefits: 'Tăng cường thăng bằng và tập trung cao độ. Mở ngực và vai. Kéo giãn đùi trước. Nâng cao tâm trạng.',
    contra: 'Huyết áp thấp, chấn thương lưng, đầu gối hoặc cổ chân.',
    howto: 'Đứng một chân, gập chân sau, tay cùng bên nắm mắt cá từ bên ngoài. Nghiêng người về trước, nâng chân lên và giơ tay kia về phía trước.' },

  { cat: 'thang-bang', img: 'assets/images/poses/virabhadrasana3.webp', vn: 'Chiến binh III', san: 'Virabhadrasana III', level: 'Trung cấp',
    benefits: 'Tăng cường cơ lưng, bụng và chân. Cải thiện thăng bằng động. Phát triển sức mạnh toàn thân.',
    contra: 'Huyết áp cao, chấn thương hông hoặc đầu gối.',
    howto: 'Đứng một chân, nghiêng thân trên song song sàn, chân sau nâng lên ngang hông. Hai tay duỗi sang hai bên hoặc về trước.' },

  { cat: 'thang-bang', img: 'assets/images/poses/utthita-hasta-padangusthasana.webp', vn: 'Tư thế Ngón tay nâng', san: 'Utthita Hasta Padangusthasana', level: 'Trung cấp',
    benefits: 'Tăng cường sức mạnh chân và cốt lõi, kéo giãn gân khoeo, cải thiện thăng bằng và phối hợp.',
    contra: 'Chấn thương mắt cá hoặc hông — giữ gối cong.',
    howto: 'Đứng một chân, nâng chân kia ra trước, tay nắm ngón chân cái (hoặc dùng dây đai). Duỗi chân thẳng dần, thân thẳng.' },

  { cat: 'thang-bang', img: 'assets/images/poses/adho-mukha-vrksasana.webp', vn: 'Tư thế Đứng bằng tay', san: 'Adho Mukha Vrksasana', level: 'Nâng cao',
    benefits: 'Tăng cường cơ cánh tay, vai và cổ tay. Cải thiện thăng bằng và tự tin. Làm mát đầu.',
    contra: 'Huyết áp cao, kinh nguyệt, tổn thương cổ tay hoặc vai.',
    howto: 'Đứng trước tường, tay chống sàn cách tường 15cm. Đá hai chân lên tựa tường. Giữ thắt lưng không võng.' },

  { cat: 'thang-bang', img: 'assets/images/poses/virabhadrasana1.webp', vn: 'Chiến binh I', san: 'Virabhadrasana I', level: 'Cơ bản',
    benefits: 'Tăng cường đùi, mắt cá và lưng. Kéo giãn ngực, phổi, vai và cổ. Tăng sự tập trung và thăng bằng.',
    contra: 'Huyết áp cao, tim yếu. Chấn thương vai — giữ tay song song thay vì chắp.',
    howto: 'Đứng dang chân rộng, chân trước quay 90°, chân sau 45°. Gập gối trước 90°. Hai tay vươn lên, hông hướng thẳng.' },

  { cat: 'thang-bang', img: 'assets/images/poses/virabhadrasana2.webp', vn: 'Chiến binh II', san: 'Virabhadrasana II', level: 'Cơ bản',
    benefits: 'Tăng cường và kéo giãn chân, mắt cá. Mở hông và ngực. Phát triển sức bền và sự tập trung.',
    contra: 'Tiêu chảy, huyết áp cao. Chấn thương đầu gối — không để gối vượt quá mắt cá.',
    howto: 'Đứng dang chân rộng, chân trước quay 90°. Gập gối trước 90°. Hai tay dang ngang, mắt nhìn theo tay trước.' },

  { cat: 'thang-bang', img: 'assets/images/poses/parivrtta-ardha-chandrasana.webp', vn: 'Bán nguyệt xoay', san: 'Parivrtta Ardha Chandrasana', level: 'Nâng cao',
    benefits: 'Kết hợp thăng bằng, xoắn và mở hông. Tăng cường cốt lõi, chân và cột sống. Cải thiện phối hợp.',
    contra: 'Huyết áp thấp, đau đầu, mất ngủ, tiêu chảy.',
    howto: 'Đứng một chân, nghiêng về trước tay đối diện chống sàn. Nâng chân sau lên, xoay thân, tay trên vươn lên trời.' },

  { cat: 'thang-bang', img: 'assets/images/poses/astavakrasana.webp', vn: 'Tư thế Tám góc', san: 'Astavakrasana', level: 'Nâng cao',
    benefits: 'Tăng cường cổ tay, cánh tay và cốt lõi. Kết hợp thăng bằng tay với xoắn thân. Phát triển sự kiểm soát cơ thể.',
    contra: 'Hội chứng ống cổ tay, chấn thương vai hoặc cổ tay. Thai kỳ.',
    howto: 'Ngồi, luồn một chân qua cánh tay. Hai tay chống sàn, nâng toàn thân lên. Hai chân móc vào nhau duỗi sang bên, thân nghiêng về trước.' },

  // ===== 8. ĐẢO NGƯỢC — Inversions (10 tư thế) =====
  { cat: 'dao-nguoc', img: 'assets/images/poses/viparita-karani.webp', vn: 'Tư thế Chân lên tường', san: 'Viparita Karani', level: 'Cơ bản',
    benefits: 'Giảm mệt mỏi chân và phù nề, cải thiện tuần hoàn tĩnh mạch, thư giãn hệ thần kinh, giảm lo âu nhẹ nhàng.',
    contra: 'Tăng nhãn áp, viêm khớp nặng ở cổ, kinh nguyệt nhiều.',
    howto: 'Nằm gần tường, đưa chân lên tựa tường thẳng hoặc hơi cong. Hai tay đặt xuôi thân. Thở đều và thư giãn.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/salamba-sarvangasana.webp', vn: 'Đứng bằng vai', san: 'Salamba Sarvangasana', level: 'Nâng cao',
    benefits: 'Tăng tuần hoàn máu lên não, kích thích tuyến giáp và tuyến cận giáp, giảm cảm giác lo âu và mệt mỏi.',
    contra: 'Kinh nguyệt, thai kỳ, cao huyết áp, chấn thương cổ, tăng nhãn áp.',
    howto: 'Nằm ngửa, nâng chân rồi hông lên, tay đỡ lưng. Toàn thân thẳng từ bờ vai đến gót chân, cổ không nên ép.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/halasana.webp', vn: 'Tư thế Cày', san: 'Halasana', level: 'Nâng cao',
    benefits: 'Kéo giãn cột sống và vai. Kích thích tuyến giáp. Giảm stress và mệt mỏi. Cải thiện tiêu hóa.',
    contra: 'Kinh nguyệt, thai kỳ, cao huyết áp, chấn thương cổ, tiêu chảy, hen suyễn.',
    howto: 'Từ đứng bằng vai, hạ chân qua đầu xuống sàn phía sau. Tay có thể đỡ lưng hoặc duỗi thẳng trên sàn.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/adho-mukha-svanasana.webp', vn: 'Chó úp mặt', san: 'Adho Mukha Svanasana', level: 'Cơ bản',
    benefits: 'Đảo ngược nhẹ nhàng, tăng lưu thông máu lên não. Kéo giãn cột sống. Phù hợp người mới bắt đầu đảo ngược.',
    contra: 'Huyết áp rất cao, hội chứng ống cổ tay, 3 tháng cuối thai kỳ.',
    howto: 'Tứ chi chống sàn, nâng hông lên tạo chữ V ngược. Đầu thả lỏng dưới tim — đây là dạng đảo ngược nhẹ.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/salamba-sirsasana.webp', vn: 'Đứng bằng đầu', san: 'Salamba Sirsasana', level: 'Nâng cao',
    benefits: 'Tăng cường lưu thông máu lên não, tăng sức mạnh vai và cốt lõi, cải thiện hệ tiêu hóa và bạch huyết.',
    contra: 'Cao huyết áp, tăng nhãn áp, kinh nguyệt, thai kỳ, chấn thương cổ — chỉ tập với huấn luyện viên.',
    howto: 'Quỳ, đan các ngón tay làm nền, đặt đỉnh đầu xuống sàn. Nâng hông lên và từ từ nâng hai chân. Cần thực hành có hướng dẫn.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/vrischikasana.webp', vn: 'Tư thế Bọ cạp', san: 'Vrischikasana', level: 'Nâng cao',
    benefits: 'Tăng cường sức mạnh vai và cốt lõi mạnh mẽ. Mở ngực sâu. Cải thiện thăng bằng tuyệt đối.',
    contra: 'Chấn thương lưng, vai, cổ, huyết áp cao.',
    howto: 'Từ tư thế cẳng tay Pincha Mayurasana, uốn cong lưng, hạ ngực và uốn đôi chân qua đầu như đuôi bọ cạp.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/pincha-mayurasana.webp', vn: 'Đứng bằng cẳng tay', san: 'Pincha Mayurasana', level: 'Nâng cao',
    benefits: 'Tăng cường vai, cánh tay và cốt lõi. Cải thiện thăng bằng. Kéo giãn cột sống và ngực.',
    contra: 'Chấn thương vai, lưng hoặc cổ. Huyết áp cao. Thai kỳ.',
    howto: 'Quỳ, đặt cẳng tay và bàn tay xuống sàn. Nâng hông lên, đá chân lên (tựa tường nếu cần). Giữ thẳng từ khuỷu đến gót.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/dolphin-pose.webp', vn: 'Tư thế Cá heo', san: 'Ardha Sirsasana', level: 'Trung cấp',
    benefits: 'Tăng cường vai, cánh tay và cốt lõi. Chuẩn bị cho Đứng bằng đầu và Đứng bằng cẳng tay. Kéo giãn gân khoeo.',
    contra: 'Chấn thương vai hoặc cổ. Huyết áp cao.',
    howto: 'Như Chó úp mặt nhưng trên cẳng tay. Đan ngón tay, đỉnh đầu giữa hai tay. Đẩy hông lên cao, thẳng cột sống.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/karnapidasana.webp', vn: 'Tư thế Ép tai', san: 'Karnapidasana', level: 'Nâng cao',
    benefits: 'Kéo giãn sâu cột sống và vai. Kích thích tuyến giáp. Giảm stress và mệt mỏi. Làm dịu tinh thần.',
    contra: 'Chấn thương cổ, huyết áp cao, kinh nguyệt, tiêu chảy, hen suyễn.',
    howto: 'Từ tư thế Cày (Halasana), gập gối hạ xuống cạnh tai. Tay đặt trên lưng hoặc duỗi thẳng trên sàn.' },

  { cat: 'dao-nguoc', img: 'assets/images/poses/setu-bandha-restorative.webp', vn: 'Cầu phục hồi', san: 'Setu Bandha Supported', level: 'Cơ bản',
    benefits: 'Đảo ngược nhẹ nhàng, mở ngực, giảm mệt mỏi. Kích thích tuyến giáp. Phù hợp phục hồi sau buổi tập.',
    contra: 'Chấn thương cổ — giữ cổ không xoay.',
    howto: 'Nằm ngửa, gập gối, nâng hông lên. Đặt khối yoga dưới xương cùng. Thả lỏng tay hai bên, thở sâu.' },

  // ===== 9. THƯ GIÃN — Restorative =====
  { cat: 'thu-gian', img: 'assets/images/poses/savasana.webp', vn: 'Tư thế Xác chết', san: 'Savasana', level: 'Cơ bản',
    benefits: 'Thư giãn toàn thân sâu nhất. Hợp nhất lợi ích của toàn buổi tập. Phục hồi hệ thần kinh. Giảm huyết áp.',
    contra: 'Không có chống chỉ định — điều chỉnh bằng gối đệm nếu cần.',
    howto: 'Nằm ngửa, tay chân buông lơi tự nhiên, lòng bàn tay ngửa. Nhắm mắt, thở bình thường. Giữ ít nhất 5–10 phút.' },


  { cat: 'thu-gian', img: 'assets/images/poses/supta-baddha-konasana.webp', vn: 'Nằm ngửa bướm', san: 'Supta Baddha Konasana', level: 'Cơ bản',
    benefits: 'Mở nhẹ hông và bẹn khi nằm ngửa. Thư giãn hoàn toàn. Tốt cho người căng thẳng, mất ngủ và mang thai.',
    contra: 'Chấn thương bẹn hoặc đầu gối — kê gối đệm dưới đùi.',
    howto: 'Nằm ngửa, hai lòng bàn chân áp vào nhau, đầu gối mở sang hai bên. Tay đặt bụng hoặc xuôi thân. Thở sâu, thư giãn sâu.' },

  { cat: 'thu-gian', img: 'assets/images/poses/sukhasana.webp', vn: 'Ngồi thiền tĩnh', san: 'Sukhasana (Thiền)', level: 'Cơ bản',
    benefits: 'Kết thúc buổi tập với tâm trí tĩnh lặng. Ổn định hệ thần kinh tự chủ. Tăng sự hiện diện và nhận thức.',
    contra: 'Không có chống chỉ định — dùng gối nếu hông cứng.',
    howto: 'Ngồi xếp bằng thoải mái, cột sống thẳng. Nhắm mắt, tập trung vào hơi thở tự nhiên. Giữ 3–10 phút.' },

  { cat: 'thu-gian', img: 'assets/images/poses/matsyasana-restorative.webp', vn: 'Cá phục hồi', san: 'Matsyasana Restorative', level: 'Cơ bản',
    benefits: 'Mở ngực và cổ họng sâu khi được hỗ trợ. Giảm lo âu và căng thẳng. Kéo giãn nhẹ nhàng cơ gian sườn.',
    contra: 'Chấn thương cổ — dùng chăn đỡ đầu.',
    howto: 'Đặt gối bolster dọc cột sống, nằm ngửa lên. Hai tay giang rộng, lòng bàn tay ngửa. Thở sâu, thả lỏng hoàn toàn.' },

  { cat: 'thu-gian', img: 'assets/images/poses/viparita-karani-rest.webp', vn: 'Chân lên tường phục hồi', san: 'Viparita Karani (Phục hồi)', level: 'Cơ bản',
    benefits: 'Giảm phù nề chân, cải thiện tuần hoàn. Thư giãn toàn bộ hệ thần kinh. Hỗ trợ giấc ngủ.',
    contra: 'Tăng nhãn áp, kinh nguyệt nặng.',
    howto: 'Nằm sát tường, nâng chân lên tựa tường. Đặt gối dưới hông nếu muốn. Tay thả lỏng, mắt nhắm. Giữ 5–15 phút.' },

  { cat: 'thu-gian', img: 'assets/images/poses/makarasana.webp', vn: 'Tư thế Cá sấu', san: 'Makarasana', level: 'Cơ bản',
    benefits: 'Thư giãn lưng dưới và vai. Cải thiện nhịp thở bụng. Giảm căng thẳng và mệt mỏi. Phù hợp nghỉ giữa buổi tập.',
    contra: 'Không có chống chỉ định — điều chỉnh vị trí tay nếu đau cổ.',
    howto: 'Nằm sấp, gập hai tay chồng lên nhau, đặt trán lên cẳng tay. Chân mở nhẹ, ngón chân quay ra ngoài. Thở bụng sâu.' },

  { cat: 'thu-gian', img: 'assets/images/poses/yoga-nidra.webp', vn: 'Yoga Nidra', san: 'Yoga Nidra', level: 'Cơ bản',
    benefits: 'Phục hồi sâu nhất — 30 phút Yoga Nidra tương đương 2 giờ ngủ. Giảm stress mãn tính. Cải thiện chất lượng giấc ngủ.',
    contra: 'Không có chống chỉ định.',
    howto: 'Nằm Savasana với gối dưới đầu gối, chăn đắp ấm, mắt bịt nhẹ. Nghe hướng dẫn quét cơ thể. Giữ tỉnh táo nhưng thư giãn.' },

  { cat: 'thu-gian', img: 'assets/images/poses/balasana-restorative.webp', vn: 'Trẻ em phục hồi', san: 'Balasana (Restorative)', level: 'Cơ bản',
    benefits: 'Thư giãn sâu toàn thân khi được hỗ trợ bởi gối bolster. Giải phóng lưng dưới, hông và vai. An toàn cho mọi cấp độ.',
    contra: 'Chấn thương đầu gối nặng — kê thêm chăn giữa mông và gót.',
    howto: 'Quỳ gối mở rộng, đặt gối bolster giữa hai đùi. Cúi người ôm lên bolster, má tựa nhẹ. Thở sâu, giữ 3–5 phút.' },


];
