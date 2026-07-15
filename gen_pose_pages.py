#!/usr/bin/env python3
"""
gen_pose_pages.py — Sinh 90 trang chi tiết tư thế Yoga cho MâyYoga.health
Đọc dữ liệu từ js/poses-data.js, mở rộng nội dung, sinh HTML vào tu-the/
"""
import os, re, json, unicodedata

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(SCRIPT_DIR, 'tu-the')
DATA_FILE  = os.path.join(SCRIPT_DIR, 'js', 'poses-data.js')

# ─── Vietnamese Slug ───────────────────────────────────────────────
def vn_slug(text):
    """Convert Vietnamese text to URL-friendly slug."""
    t = text.lower()
    MAP = {'đ':'d','Đ':'d','ă':'a','â':'a','ê':'e','ô':'o','ơ':'o','ư':'u','á':'a','à':'a','ả':'a','ã':'a','ạ':'a',
           'ắ':'a','ằ':'a','ẳ':'a','ẵ':'a','ặ':'a','ấ':'a','ầ':'a','ẩ':'a','ẫ':'a','ậ':'a','é':'e','è':'e','ẻ':'e',
           'ẽ':'e','ẹ':'e','ế':'e','ề':'e','ể':'e','ễ':'e','ệ':'e','í':'i','ì':'i','ỉ':'i','ĩ':'i','ị':'i',
           'ó':'o','ò':'o','ỏ':'o','õ':'o','ọ':'o','ố':'o','ồ':'o','ổ':'o','ỗ':'o','ộ':'o','ớ':'o','ờ':'o','ở':'o',
           'ỡ':'o','ợ':'o','ú':'u','ù':'u','ủ':'u','ũ':'u','ụ':'u','ứ':'u','ừ':'u','ử':'u','ữ':'u','ự':'u',
           'ý':'y','ỳ':'y','ỷ':'y','ỹ':'y','ỵ':'y'}
    out = []
    for c in t:
        out.append(MAP.get(c, c))
    t = ''.join(out)
    t = re.sub(r'[^a-z0-9\s-]', '', t)
    t = re.sub(r'[\s]+', '-', t.strip())
    t = re.sub(r'-+', '-', t)
    return t

# Special slug overrides for collisions
SLUG_OVERRIDES = {
    'Tư thế Cày': 'tu-the-cay-halasana',
}
def get_slug(vn):
    return SLUG_OVERRIDES.get(vn, vn_slug(vn))

# ─── Parse poses-data.js ──────────────────────────────────────────
def parse_js_data(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        raw = f.read()
    # Extract POSE_CATEGORIES
    m = re.search(r'const\s+POSE_CATEGORIES\s*=\s*\[(.*?)\];', raw, re.S)
    cats_raw = m.group(1) if m else ''
    categories = []
    for cm in re.finditer(r'\{([^}]+)\}', cats_raw):
        d = {}
        for kv in re.finditer(r"(\w+)\s*:\s*'([^']*)'", cm.group(1)):
            d[kv.group(1)] = kv.group(2)
        if 'id' in d:
            categories.append(d)
    # Extract POSES
    m2 = re.search(r'const\s+POSES\s*=\s*\[(.*)\];', raw, re.S)
    poses_raw = m2.group(1) if m2 else ''
    poses = []
    for pm in re.finditer(r'\{([^}]+)\}', poses_raw):
        block = pm.group(1)
        d = {}
        for kv in re.finditer(r"(\w+)\s*:\s*'([^']*)'", block):
            d[kv.group(1)] = kv.group(2)
        if 'vn' in d and 'san' in d:
            poses.append(d)
    return categories, poses

# ─── English Names & Pronunciations ───────────────────────────────
ENG_MAP = {
    'Uttanasana': ('Standing Forward Bend', 'oot-tan-AHS-anna'),
    'Paschimottanasana': ('Seated Forward Bend', 'POSH-ee-moh-tan-AHS-anna'),
    'Balasana': ("Child's Pose", 'bah-LAHS-anna'),
    'Ardha Uttanasana': ('Half Forward Bend', 'ARE-dah oot-tan-AHS-anna'),
    'Janu Sirsasana': ('Head-to-Knee Pose', 'JAH-noo sheer-SHAHS-anna'),
    'Prasarita Padottanasana': ('Wide-Legged Forward Bend', 'pra-sa-REE-tah pah-doh-tan-AHS-anna'),
    'Padahastasana': ('Hand Under Foot Pose', 'pah-dah-has-TAHS-anna'),
    'Upavistha Konasana': ('Wide-Angle Seated Bend', 'oo-pah-VISH-tah cone-AHS-anna'),
    'Parsvottanasana': ('Pyramid Pose', 'parsh-voh-tan-AHS-anna'),
    'Kurmasana': ('Tortoise Pose', 'koor-MAHS-anna'),
    'Bhujangasana': ('Cobra Pose', 'boo-jang-GAHS-anna'),
    'Setu Bandha Sarvangasana': ('Bridge Pose', 'SET-oo BAHN-dah sar-vahn-GAHS-anna'),
    'Ustrasana': ('Camel Pose', 'oosh-TRAHS-anna'),
    'Salabhasana': ('Locust Pose', 'sha-la-BAHS-anna'),
    'Dhanurasana': ('Bow Pose', 'don-your-AHS-anna'),
    'Matsyasana': ('Fish Pose', 'mot-see-AHS-anna'),
    'Urdhva Mukha Svanasana': ('Upward-Facing Dog', 'OORD-vah MOO-kah shvah-NAHS-anna'),
    'Urdhva Dhanurasana': ('Wheel Pose', 'OORD-vah don-your-AHS-anna'),
    'Anjaneyasana': ('Crescent Lunge', 'AHN-jah-nay-AHS-anna'),
    'Supta Virasana': ('Reclining Hero Pose', 'SOOP-tah veer-AHS-anna'),
    'Trikonasana': ('Triangle Pose', 'trik-cone-AHS-anna'),
    'Ardha Chandrasana': ('Half Moon Pose', 'ARE-dah chan-DRAHS-anna'),
    'Utthita Parsvakonasana': ('Extended Side Angle', 'oo-TEE-tah PARSH-vah-cone-AHS-anna'),
    'Nitambhasana': ('Standing Side Bend', 'nee-tam-BAHS-anna'),
    'Parighasana': ('Gate Pose', 'par-ee-GAHS-anna'),
    'Parivrtta Janu Sirsasana': ('Revolved Head-to-Knee', 'par-ee-VRIT-tah JAH-noo sheer-SHAHS-anna'),
    'Anantasana': ('Sleeping Vishnu Pose', 'ah-nan-TAHS-anna'),
    'Parsva Sukhasana': ('Seated Side Bend', 'PARSH-vah soo-KAHS-anna'),
    'Viparita Virabhadrasana': ('Reverse Warrior', 'vip-ah-REE-tah veer-ah-bah-DRAHS-anna'),
    'Ardha Kati Chakrasana': ('Standing Lateral Bend', 'ARE-dah KAH-tee chak-RAHS-anna'),
    'Ardha Matsyendrasana': ('Half Lord of the Fishes', 'ARE-dah MOT-see-en-DRAHS-anna'),
    'Parivrtta Trikonasana': ('Revolved Triangle', 'par-ee-VRIT-tah trik-cone-AHS-anna'),
    'Parivrtta Parsvakonasana': ('Revolved Side Angle', 'par-ee-VRIT-tah PARSH-vah-cone-AHS-anna'),
    'Supta Matsyendrasana': ('Supine Spinal Twist', 'SOOP-tah MOT-see-en-DRAHS-anna'),
    'Bharadvajasana': ("Bharadvaja's Twist", 'bah-ROD-va-JAHS-anna'),
    'Parivrtta Balasana': ('Thread the Needle', 'par-ee-VRIT-tah bah-LAHS-anna'),
    'Parivrtta Anjaneyasana': ('Revolved Crescent Lunge', 'par-ee-VRIT-tah AHN-jah-nay-AHS-anna'),
    'Parivrtta Utkatasana': ('Revolved Chair Pose', 'par-ee-VRIT-tah OOT-kah-TAHS-anna'),
    'Eka Pada Koundinyasana II': ('Flying Splits', 'EH-kah PAH-dah kown-din-YAHS-anna'),
    'Katichakrasana': ('Standing Spinal Twist', 'KAH-tee-chak-RAHS-anna'),
    'Navasana': ('Boat Pose', 'nah-VAHS-anna'),
    'Phalakasana': ('Plank Pose', 'fal-ah-KAHS-anna'),
    'Vasisthasana': ('Side Plank', 'vah-sish-TAHS-anna'),
    'Jathara Parivartanasana': ('Revolved Abdomen Pose', 'JAH-tar-ah par-ee-var-tan-AHS-anna'),
    'Purvottanasana': ('Upward Plank Pose', 'purr-voh-tan-AHS-anna'),
    'Chaturanga Dandasana': ('Four-Limbed Staff Pose', 'chah-tour-ANG-ah dan-DAHS-anna'),
    'Utkatasana': ('Chair Pose', 'OOT-kah-TAHS-anna'),
    'Bakasana': ('Crow Pose', 'bahk-AHS-anna'),
    'Tolasana': ('Scale Pose', 'toh-LAHS-anna'),
    'Ardha Navasana': ('Half Boat Pose', 'ARE-dah nah-VAHS-anna'),
    'Baddha Konasana': ('Bound Angle Pose', 'BAH-dah cone-AHS-anna'),
    'Padmasana': ('Lotus Pose', 'pod-MAHS-anna'),
    'Eka Pada Rajakapotasana': ('Pigeon Pose', 'EH-kah PAH-dah rah-jah-kah-poh-TAHS-anna'),
    'Virasana': ('Hero Pose', 'veer-AHS-anna'),
    'Malasana': ('Garland Pose / Squat', 'mah-LAHS-anna'),
    'Ananda Balasana': ('Happy Baby Pose', 'ah-NAN-dah bah-LAHS-anna'),
    'Gomukhasana': ('Cow Face Pose', 'go-moo-KAHS-anna'),
    'Supta Padangusthasana': ('Reclining Hand-to-Big-Toe', 'SOOP-tah pah-dan-goosh-TAHS-anna'),
    'Agnistambhasana': ('Fire Log Pose', 'ag-nee-stahm-BAHS-anna'),
    'Hanumanasana': ('Monkey Pose / Splits', 'hah-new-mahn-AHS-anna'),
    'Vrksasana': ('Tree Pose', 'vrik-SHAHS-anna'),
    'Garudasana': ('Eagle Pose', 'gah-roo-DAHS-anna'),
    'Natarajasana': ("Dancer's Pose", 'not-ah-raj-AHS-anna'),
    'Virabhadrasana III': ('Warrior III', 'veer-ah-bah-DRAHS-anna III'),
    'Utthita Hasta Padangusthasana': ('Extended Hand-to-Big-Toe', 'oo-TEE-tah HAS-tah pah-dan-goosh-TAHS-anna'),
    'Adho Mukha Vrksasana': ('Handstand', 'ah-doh MOO-kah vrik-SHAHS-anna'),
    'Virabhadrasana I': ('Warrior I', 'veer-ah-bah-DRAHS-anna I'),
    'Virabhadrasana II': ('Warrior II', 'veer-ah-bah-DRAHS-anna II'),
    'Parivrtta Ardha Chandrasana': ('Revolved Half Moon', 'par-ee-VRIT-tah ARE-dah chan-DRAHS-anna'),
    'Astavakrasana': ('Eight-Angle Pose', 'ahsh-tah-vak-RAHS-anna'),
    'Viparita Karani': ('Legs Up the Wall', 'vip-ah-REE-tah kah-RAH-nee'),
    'Salamba Sarvangasana': ('Shoulderstand', 'sah-LOM-bah sar-vahn-GAHS-anna'),
    'Halasana': ('Plow Pose', 'hah-LAHS-anna'),
    'Adho Mukha Svanasana': ('Downward-Facing Dog', 'ah-doh MOO-kah shvah-NAHS-anna'),
    'Salamba Sirsasana': ('Headstand', 'sah-LOM-bah sheer-SHAHS-anna'),
    'Vrischikasana': ('Scorpion Pose', 'vrish-CHEEK-AHS-anna'),
    'Pincha Mayurasana': ('Forearm Stand', 'pin-cha my-oor-AHS-anna'),
    'Ardha Sirsasana': ('Dolphin Pose', 'ARE-dah sheer-SHAHS-anna'),
    'Karnapidasana': ('Ear Pressure Pose', 'kar-nah-pee-DAHS-anna'),
    'Setu Bandha Supported': ('Supported Bridge', 'SET-oo BAHN-dah'),
    'Savasana': ('Corpse Pose', 'shah-VAHS-anna'),
    'Supta Baddha Konasana': ('Reclining Bound Angle', 'SOOP-tah BAH-dah cone-AHS-anna'),
    'Sukhasana (Thiền)': ('Easy Seated Pose', 'soo-KAHS-anna'),
    'Matsyasana Restorative': ('Supported Fish Pose', 'mot-see-AHS-anna'),
    'Viparita Karani (Phục hồi)': ('Restorative Legs Up Wall', 'vip-ah-REE-tah kah-RAH-nee'),
    'Makarasana': ('Crocodile Pose', 'mah-kar-AHS-anna'),
    'Yoga Nidra': ('Yogic Sleep', 'YOH-gah NEE-drah'),
    'Balasana (Restorative)': ("Restorative Child's Pose", 'bah-LAHS-anna'),
}

# ─── Category Templates ──────────────────────────────────────────
CAT_NAMES = {
    'cui-gap':'Cúi gập', 'uon-lung':'Uốn lưng', 'nghieng-luon':'Nghiêng lườn',
    'van-xoan':'Vặn xoắn', 'co-bung':'Cơ bụng', 'mo-khop':'Mở khớp',
    'thang-bang':'Thăng bằng', 'dao-nguoc':'Đảo ngược', 'thu-gian':'Thư giãn'
}

ALIGNMENT_TIPS = {
    'cui-gap': [
        'Gập từ khớp hông, không từ lưng — hãy tưởng tượng bụng dưới chạm đùi trước.',
        'Giữ cột sống dài và thẳng, tránh cong gù lưng khi gập người.',
        'Khuỵu nhẹ gối nếu gân khoeo còn cứng để bảo vệ lưng dưới.',
        'Giữ trọng lượng đều trên cả bàn chân, không dồn về gót.',
        'Thả lỏng cổ và đầu, để trọng lực kéo dài cột sống tự nhiên.'
    ],
    'uon-lung': [
        'Kéo dài cột sống trước khi uốn — hít vào vươn cao, thở ra mới uốn.',
        'Ép xương chậu về phía sàn, siết nhẹ cơ mông để bảo vệ lưng dưới.',
        'Mở rộng ngực và vai, kéo xương bả vai xuống và về phía sau.',
        'Không gập cổ quá mức — giữ cổ là phần mở rộng tự nhiên của cột sống.',
        'Phân bổ đều độ uốn trên toàn bộ cột sống, tránh uốn quá sâu tại một điểm.'
    ],
    'nghieng-luon': [
        'Nghiêng trên mặt phẳng bên — không xoay hay ngả người về trước/sau.',
        'Giữ cả hai mặt bên của thân dài, đặc biệt bên nghiêng xuống.',
        'Tưởng tượng cơ thể kẹp giữa hai tấm kính để duy trì alignment.',
        'Kéo hông đối diện xuống để tăng độ kéo giãn sườn.',
        'Giữ vai thư giãn, tránh nhún vai lên tai.'
    ],
    'van-xoan': [
        'Kéo dài cột sống trước khi xoắn — hít vào dài ra, thở ra mới xoắn.',
        'Bắt đầu xoắn từ bụng dưới, lên ngực, rồi cuối cùng là cổ.',
        'Giữ hông ổn định, cân bằng — xoắn đến từ cột sống, không phải vai.',
        'Không dùng tay để ép xoắn sâu hơn khả năng tự nhiên.',
        'Giữ cả hai bên mông đều áp sàn khi ngồi xoắn.'
    ],
    'co-bung': [
        'Kéo rốn về phía cột sống để kích hoạt cơ bụng sâu.',
        'Giữ lưng dưới ấn nhẹ vào sàn (khi nằm) để bảo vệ thắt lưng.',
        'Không nín thở — thở đều đặn giúp duy trì sức mạnh lâu hơn.',
        'Giữ vai thư giãn, tránh căng cổ khi siết bụng.',
        'Tập trung vào chất lượng hơn số lượng — giữ form đúng quan trọng hơn giữ lâu.'
    ],
    'mo-khop': [
        'Để hông mở tự nhiên — không ép gối xuống bằng tay hoặc lực.',
        'Xoay đùi ra ngoài từ ổ khớp háng, không từ đầu gối.',
        'Ngồi trên gối đệm nếu hông cứng để giữ cột sống thẳng.',
        'Lắng nghe cơ thể — đau nhói ở đầu gối là tín hiệu cần dừng.',
        'Kiên nhẫn — hông cần thời gian dài để mở, không thể vội.'
    ],
    'thang-bang': [
        'Tập trung mắt nhìn vào một điểm cố định (drishti) để ổn định.',
        'Ấn chắc bàn chân trụ xuống sàn, trải đều 4 góc bàn chân.',
        'Siết nhẹ cơ bụng để tạo trung tâm ổn định cho toàn thân.',
        'Giữ hơi thở đều và chậm — thở nhanh làm mất thăng bằng.',
        'Bắt đầu từ phiên bản đơn giản, nâng dần khi đã vững.'
    ],
    'dao-nguoc': [
        'Không bao giờ xoay cổ khi đang đảo ngược để tránh chấn thương.',
        'Dùng tay/cẳng tay đỡ chắc chắn, phân bổ trọng lượng đều.',
        'Siết cốt lõi mạnh để bảo vệ cột sống khi đảo ngược.',
        'Đi lên và xuống từ từ, có kiểm soát — không giật.',
        'Tập gần tường nếu mới bắt đầu để có điểm tựa an toàn.'
    ],
    'thu-gian': [
        'Sử dụng đạo cụ (gối, chăn, khối) để cơ thể được hỗ trợ hoàn toàn.',
        'Để mắt nhắm nhẹ, hàm thả lỏng, lưỡi rời khỏi vòm miệng.',
        'Không cố gắng — thư giãn là buông bỏ, không phải nỗ lực.',
        'Giữ ấm cơ thể bằng chăn mỏng vì nhiệt độ cơ thể giảm khi nghỉ.',
        'Tập trung vào hơi thở tự nhiên, quan sát mà không điều khiển.'
    ]
}

CUEING = {
    'cui-gap': ['"Gập từ khớp hông, để bụng dưới dẫn đường về phía đùi."','"Thả đầu nặng, để trọng lực kéo dài cột sống."','"Khuỵu gối nếu cần — lưng thẳng quan trọng hơn chân thẳng."'],
    'uon-lung': ['"Nâng ngực lên trời, mở rộng xương đòn."','"Ấn xương chậu xuống, kéo dài từ thắt lưng đến đỉnh đầu."','"Thở vào mở ngực, thở ra giữ vững."'],
    'nghieng-luon': ['"Kéo dài hai bên sườn như đang kéo giãn một sợi dây đàn."','"Hông giữ thẳng, chỉ nghiêng thân trên."','"Cảm nhận không gian mở ra giữa các xương sườn."'],
    'van-xoan': ['"Hít vào kéo dài cột sống, thở ra xoắn sâu hơn một chút."','"Xoắn từ rốn lên, để vai là phần cuối cùng di chuyển."','"Giữ hông vuông góc, để xoắn đến từ cột sống."'],
    'co-bung': ['"Rốn kéo về cột sống, cảm nhận sức mạnh từ trung tâm."','"Giữ thở đều, không nín thở."','"Thà giữ ít giây mà đúng form, còn hơn nhiều giây mà sai."'],
    'mo-khop': ['"Để hông tự mở theo nhịp thở, không ép."','"Xoay đùi từ ổ khớp háng, bảo vệ đầu gối."','"Kiên nhẫn và nhẹ nhàng — hông cần thời gian."'],
    'thang-bang': ['"Chân trụ bám rễ sâu vào đất, vững như cây cổ thụ."','"Mắt nhìn cố định, tâm trí tĩnh lặng."','"Nếu ngã, cười và thử lại — đó là bài học thăng bằng."'],
    'dao-nguoc': ['"Đi lên từ từ, kiểm soát từng centimet."','"Siết bụng mạnh để bảo vệ lưng."','"Nếu mới tập, luôn có tường phía sau."'],
    'thu-gian': ['"Buông bỏ mọi nỗ lực, để cơ thể nặng xuống sàn."','"Thở tự nhiên, không cần điều khiển."','"Cho phép bản thân không làm gì cả."']
}

MODIFICATIONS = {
    'cui-gap': [('Khuỵu gối','Gập gối nhẹ để giảm áp lực lên gân khoeo và lưng dưới.'),('Dùng khối yoga','Đặt tay lên khối yoga thay vì chạm sàn.'),('Dùng dây đai','Vòng dây qua bàn chân nếu không thể nắm chân.')],
    'uon-lung': [('Giảm biên độ','Uốn ít hơn, tập trung vào mở ngực hơn là uốn sâu.'),('Dùng gối đỡ','Đặt gối dưới lưng hoặc hông để hỗ trợ.'),('Tay đặt thấp','Giữ tay trên hông thay vì vươn lên hoặc ra sau.')],
    'nghieng-luon': [('Giảm biên độ nghiêng','Nghiêng ít hơn, tập trung vào cảm giác kéo giãn nhẹ.'),('Dùng ghế hỗ trợ','Đặt tay lên ghế thay vì chạm sàn.'),('Tập ngồi','Thực hiện biến thể ngồi nếu đứng không ổn định.')],
    'van-xoan': [('Xoắn nhẹ','Giảm biên độ xoắn, chỉ xoắn đến mức thoải mái.'),('Ngồi trên gối','Nâng hông bằng gối đệm để cột sống thẳng hơn.'),('Dùng khối yoga','Đặt tay lên khối thay vì sàn khi xoắn đứng.')],
    'co-bung': [('Gập gối','Giữ gối cong để giảm tải cho cơ bụng dưới.'),('Đặt tay sau đầu','Đỡ đầu bằng tay để giảm căng cổ.'),('Giữ thời gian ngắn','Bắt đầu với 10-15 giây, tăng dần.')],
    'mo-khop': [('Dùng gối đệm','Kê gối dưới đùi hoặc hông để giảm áp lực.'),('Dùng dây đai','Vòng dây quanh chân nếu không thể nắm.'),('Tập nằm','Thực hiện biến thể nằm ngửa để lưng được hỗ trợ.')],
    'thang-bang': [('Tập gần tường','Đứng cạnh tường để có điểm tựa khi cần.'),('Chân thấp hơn','Đặt chân ở vị trí thấp hơn (bắp chân thay vì đùi).'),('Mắt mở','Giữ mắt mở và nhìn cố định vào một điểm.')],
    'dao-nguoc': [('Dùng tường','Tập với tường hỗ trợ phía sau.'),('Dùng gối bolster','Đặt gối dưới hông hoặc lưng để nâng nhẹ.'),('Phiên bản nhẹ','Chọn phiên bản đảo ngược nhẹ hơn (Chó úp mặt, Chân lên tường).')],
    'thu-gian': [('Thêm đạo cụ','Sử dụng thêm chăn, gối, khối để thoải mái tối đa.'),('Bịt mắt','Dùng khăn bịt mắt để thư giãn sâu hơn.'),('Đắp chăn','Giữ ấm cơ thể bằng chăn mỏng.')]
}

VARIATIONS = {
    'cui-gap': [('Nâng cao: Gập sâu hơn','Nắm sau mắt cá chân, kéo ngực sát đùi.'),('Biến thể động','Kết hợp hít vào nửa gập, thở ra gập sâu theo nhịp thở.')],
    'uon-lung': [('Nâng cao: Uốn sâu hơn','Thả đầu ra sau, kéo giãn toàn bộ mặt trước cơ thể.'),('Kết hợp tay','Thêm vị trí tay nâng cao hoặc nắm chân.')],
    'nghieng-luon': [('Nâng cao: Mở rộng hơn','Tăng biên độ nghiêng, mở ngực lên trần nhà.'),('Kết hợp xoắn','Thêm yếu tố xoắn nhẹ vào tư thế nghiêng.')],
    'van-xoan': [('Nâng cao: Bind','Luồn tay sau lưng nắm tay để xoắn sâu hơn.'),('Xoắn + Nâng','Kết hợp xoắn với nâng chân hoặc cân bằng tay.')],
    'co-bung': [('Nâng cao: Thêm thời gian','Tăng thời gian giữ lên 30-60 giây.'),('Biến thể động','Kết hợp chuyển động (duỗi-co chân) để tăng thử thách.')],
    'mo-khop': [('Nâng cao: Gập về trước','Thêm gập người về trước để tăng mở hông.'),('Full expression','Tiến đến phiên bản đầy đủ của tư thế.')],
    'thang-bang': [('Nâng cao: Nhắm mắt','Thử giữ tư thế với mắt nhắm để tăng thử thách.'),('Thêm chuyển động','Kết hợp chuyển động tay hoặc thân khi đang giữ thăng bằng.')],
    'dao-nguoc': [('Nâng cao: Rời tường','Tập không cần tường hỗ trợ.'),('Biến thể chân','Thay đổi vị trí chân (xẻ, gập) khi đảo ngược.')],
    'thu-gian': [('Kéo dài thời gian','Tăng thời gian giữ lên 10-15 phút.'),('Thêm thiền','Kết hợp thiền hoặc body scan trong khi giữ tư thế.')]
}

MISTAKES = {
    'cui-gap': ['Gù lưng khi gập — cần giữ cột sống dài.','Khoá thẳng đầu gối — nên giữ micro-bend.','Nín thở khi gập sâu — cần thở đều.','Ép gập quá sâu khi gân khoeo còn cứng.'],
    'uon-lung': ['Uốn quá sâu tại thắt lưng — cần phân bổ đều.','Nhún vai lên tai — cần kéo vai xuống.','Siết mông quá mức — chỉ siết nhẹ.','Ngửa cổ quá mức — giữ cổ tự nhiên.'],
    'nghieng-luon': ['Xoay người về trước thay vì nghiêng thuần túy.','Đẩy hông lệch ra ngoài — giữ hông thẳng.','Co rút bên nghiêng xuống — giữ cả hai bên dài.','Nhún vai — giữ vai thư giãn.'],
    'van-xoan': ['Xoắn bằng vai thay vì từ cột sống.','Để hông lệch khi xoắn.','Nín thở khi xoắn sâu.','Dùng tay ép quá mức để xoắn sâu hơn.'],
    'co-bung': ['Căng cổ thay vì dùng cơ bụng.','Lưng dưới cong khỏi sàn — cần ấn lưng xuống.','Nín thở khi siết bụng.','Chọn biến thể quá khó, hy sinh form đúng.'],
    'mo-khop': ['Ép gối xuống bằng tay — gây hại đầu gối.','Gù lưng khi ngồi — cần cột sống thẳng.','So sánh với người khác — mỗi hông khác nhau.','Quên thở khi giữ tư thế.'],
    'thang-bang': ['Nhìn xuống sàn — mắt cần nhìn thẳng.','Khoá đầu gối chân trụ — giữ micro-bend.','Nghiêng người để bù đắp — giữ thân thẳng.','Thở nhanh và nông — cần thở chậm sâu.'],
    'dao-nguoc': ['Xoay cổ khi đảo ngược — rất nguy hiểm.','Nhảy lên quá nhanh — cần đi lên từ từ.','Giữ quá lâu khi mới tập.','Tập khi cổ hoặc vai đang đau.'],
    'thu-gian': ['Cố gắng thư giãn (mâu thuẫn!) — chỉ cần buông bỏ.','Kiểm tra điện thoại — loại bỏ phiền nhiễu.','Bỏ qua Savasana — đây là tư thế quan trọng nhất.','Không dùng đạo cụ khi cần — thoải mái là ưu tiên.']
}

WHEN_AVOID = {
    'cui-gap': ['Thoát vị đĩa đệm hoặc đau lưng dưới cấp tính.','Huyết áp cao — tránh giữ đầu thấp lâu.','Đang có chấn thương gân khoeo.','Chóng mặt hoặc viêm xoang nặng.'],
    'uon-lung': ['Thai kỳ — tránh nằm sấp và uốn sâu.','Chấn thương cột sống hoặc thoát vị đĩa đệm.','Đau đầu hoặc migraine.','Huyết áp cao hoặc thấp không kiểm soát.'],
    'nghieng-luon': ['Đau sườn hoặc gian sườn.','Chấn thương vai hoặc cổ.','Huyết áp thấp — đứng dậy từ từ.','Thoát vị đĩa đệm bên.'],
    'van-xoan': ['Thai kỳ — chỉ xoắn mở (open twist).','Thoát vị đĩa đệm hoặc chấn thương cột sống.','Sau phẫu thuật bụng.','Tiêu chảy hoặc đau bụng cấp.'],
    'co-bung': ['Thai kỳ — tránh các tư thế siết bụng mạnh.','Thoát vị thành bụng.','Đau lưng dưới cấp tính.','Sau phẫu thuật bụng gần đây.'],
    'mo-khop': ['Chấn thương đầu gối — không ép khi đau.','Viêm khớp hông cấp tính.','Chấn thương bẹn hoặc đùi trong.','Thai kỳ muộn — cần điều chỉnh.'],
    'thang-bang': ['Chóng mặt hoặc rối loạn tiền đình.','Chấn thương mắt cá chân gần đây.','Huyết áp rất thấp.','Mệt mỏi quá mức — chọn tư thế nghỉ.'],
    'dao-nguoc': ['Huyết áp cao không kiểm soát.','Tăng nhãn áp hoặc bệnh mắt.','Kinh nguyệt (tranh luận, nhưng nên thận trọng).','Chấn thương cổ hoặc vai.'],
    'thu-gian': ['Hầu như không có chống chỉ định.','Nếu đau ở tư thế nào, thêm đạo cụ hỗ trợ.','Tham khảo bác sĩ nếu đang điều trị bệnh nặng.','Điều chỉnh nếu có thai — nằm nghiêng thay vì ngửa.']
}

# ─── Build intro/why/faq from existing data ───────────────────────
def make_intro(pose, cat_name, eng):
    return f"{pose['vn']} ({pose['san']}) là một tư thế yoga thuộc nhóm {cat_name}, phù hợp với người tập cấp độ {pose['level']}. Trong tiếng Anh, tư thế này được gọi là {eng}. {pose['benefits'].split('.')[0]}."

def make_why(pose, cat_name):
    b = pose['benefits'].split('.')[0]
    return f"{pose['vn']} là một trong những tư thế quan trọng trong nhóm {cat_name} của Hatha Yoga. {b}. Tư thế này không chỉ mang lại lợi ích thể chất mà còn giúp tĩnh tâm, tăng sự hiện diện trong khoảnh khắc hiện tại. Dù bạn là người mới hay đã tập lâu năm, {pose['vn']} luôn có điều gì đó để khám phá và cải thiện trong mỗi lần thực hành."

def make_faq(pose, cat_name):
    faq = []
    level = pose.get('level','Cơ bản')
    vn = pose['vn']
    if level == 'Cơ bản':
        faq.append((f'Tôi mới tập yoga, có thể tập {vn} được không?', f'Hoàn toàn được! {vn} là tư thế cấp độ cơ bản, phù hợp cho người mới. Hãy bắt đầu với phiên bản đơn giản nhất và tăng dần theo khả năng.'))
    elif level == 'Trung cấp':
        faq.append((f'{vn} có khó không?', f'{vn} ở cấp độ trung cấp. Bạn nên nắm vững các tư thế cơ bản trước khi thử. Dùng đạo cụ hỗ trợ nếu cần.'))
    else:
        faq.append((f'Tôi cần chuẩn bị gì trước khi tập {vn}?', f'{vn} là tư thế nâng cao. Hãy chắc chắn bạn đã thành thạo các tư thế cơ bản và trung cấp trong nhóm {cat_name}. Nên tập với giáo viên có kinh nghiệm.'))
    faq.append((f'Nên giữ {vn} bao lâu?', f'Đối với tư thế {level.lower()}, hãy giữ 5-8 nhịp thở (khoảng 30 giây đến 1 phút). Tăng dần thời gian khi cơ thể đã quen.'))
    faq.append((f'Tập {vn} mỗi ngày có được không?', f'Có thể tập mỗi ngày nếu cơ thể không có dấu hiệu đau. Lắng nghe cơ thể và nghỉ ngơi khi cần thiết.'))
    return faq

def split_benefits(text):
    parts = [p.strip() for p in re.split(r'[.\n]', text) if p.strip() and len(p.strip()) > 10]
    icons = ['🌿','💪','🧘','❤️','🧠','🫁','🦴','✨']
    return [(icons[i % len(icons)], p.rstrip('.') + '.') for i, p in enumerate(parts)]

def split_steps(text):
    parts = [p.strip() for p in re.split(r'[.\n]', text) if p.strip() and len(p.strip()) > 8]
    return [p.rstrip('.') + '.' for p in parts]

def split_contra(text):
    parts = [p.strip() for p in re.split(r'[.,\n]', text) if p.strip() and len(p.strip()) > 5]
    return [p.rstrip('.') + '.' for p in parts]

# ─── HTML Template ────────────────────────────────────────────────
def level_class(level):
    if level == 'Cơ bản': return 'basic'
    if level == 'Trung cấp': return 'intermediate'
    return 'advanced'

def html_escape(s):
    return s.replace('&','&amp;').replace('<','&lt;').replace('>','&gt;').replace('"','&quot;')

def generate_html(pose, cat_name, slug, eng, pron, all_poses, cat_id):
    vn = pose['vn']
    san = pose['san']
    level = pose.get('level','Cơ bản')
    img = pose['img']
    lc = level_class(level)

    intro = make_intro(pose, cat_name, eng)
    why = make_why(pose, cat_name)
    faq = make_faq(pose, cat_name)
    benefits = split_benefits(pose.get('benefits',''))
    steps = split_steps(pose.get('howto',''))
    contra = split_contra(pose.get('contra',''))
    tips = ALIGNMENT_TIPS.get(cat_id, ALIGNMENT_TIPS['thu-gian'])
    cues = CUEING.get(cat_id, CUEING['thu-gian'])
    mods = MODIFICATIONS.get(cat_id, MODIFICATIONS['thu-gian'])
    vars_ = VARIATIONS.get(cat_id, VARIATIONS['thu-gian'])
    mistakes = MISTAKES.get(cat_id, MISTAKES['thu-gian'])
    avoid = WHEN_AVOID.get(cat_id, WHEN_AVOID['thu-gian'])

    # Related poses (same category, different pose)
    related = [p for p in all_poses if p['cat'] == cat_id and p['san'] != san][:4]

    benefits_html = '\n'.join(f'            <div class="pose-benefit-card"><span class="benefit-icon">{icon}</span><p>{txt}</p></div>' for icon, txt in benefits)
    steps_html = '\n'.join(f'            <li class="pose-step"><span class="step-num">{i+1}</span><p>{s}</p></li>' for i, s in enumerate(steps))
    tips_html = '\n'.join(f'            <div class="pose-alignment-tip"><p>{t}</p></div>' for t in tips)
    cues_html = '\n'.join(f'            <blockquote class="pose-cue"><p>{c}</p></blockquote>' for c in cues)
    contra_html = '\n'.join(f'            <div class="pose-contra-card"><span>⚠️</span><p>{c}</p></div>' for c in contra)
    mods_html = '\n'.join(f'              <div class="pose-mod-card"><h4>{m[0]}</h4><p>{m[1]}</p></div>' for m in mods)
    vars_html = '\n'.join(f'              <div class="pose-mod-card pose-mod-card--variation"><h4>{v[0]}</h4><p>{v[1]}</p></div>' for v in vars_)
    mistakes_html = '\n'.join(f'            <div class="pose-mistake-card"><span class="mistake-icon">✕</span><p>{m}</p></div>' for m in mistakes)
    avoid_html = '\n'.join(f'            <div class="pose-avoid-item"><span>⚠</span><p>{a}</p></div>' for a in avoid)
    faq_html = '\n'.join(f'''            <details class="pose-faq-item">
              <summary>{q}</summary>
              <div class="pose-faq-answer"><p>{a}</p></div>
            </details>''' for q, a in faq)

    related_html = ''
    for rp in related:
        rs = get_slug(rp['vn'])
        rl = level_class(rp.get('level','Cơ bản'))
        related_html += f'''        <a href="{rs}.html" class="pose-related-card">
          <div class="pose-related-img"><img src="../{rp['img']}" alt="{html_escape(rp['vn'])}" loading="lazy"></div>
          <div class="pose-related-info">
            <h4>{html_escape(rp['vn'])}</h4>
            <p class="pose-related-san">{html_escape(rp['san'])}</p>
            <span class="pose-tag pose-tag-level {rl}">{rp.get('level','Cơ bản')}</span>
          </div>
        </a>\n'''

    desc = f"Hướng dẫn chi tiết {vn} ({san}): lợi ích, cách thực hiện từng bước, mẹo căn chỉnh, chống chỉ định và biến thể. Minh họa 3D."

    return f'''<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html_escape(vn)} — {html_escape(san)} | Mây Yoga</title>
  <meta name="description" content="{html_escape(desc)}">
  <link rel="stylesheet" href="../css/style.css?v=4">
  <link rel="stylesheet" href="../css/pose-detail.css?v=1">
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <meta property="og:title" content="{html_escape(vn)} — {html_escape(san)} | Mây Yoga">
  <meta property="og:description" content="{html_escape(desc)}">
  <meta property="og:url" content="https://mayyoga.health/tu-the/{slug}.html">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://mayyoga.health/{img}">
  <meta property="og:site_name" content="Mây Yoga">
  <meta property="og:locale" content="vi_VN">
  <link rel="canonical" href="https://mayyoga.health/tu-the/{slug}.html">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html_escape(vn)} — {html_escape(san)} | Mây Yoga">
  <meta name="twitter:description" content="{html_escape(desc)}">
  <meta name="twitter:image" content="https://mayyoga.health/{img}">
</head>
<body>

  <nav class="navbar scrolled" id="navbar">
    <div class="container">
      <a href="../index.html" class="nav-logo"><img src="../assets/images/logo.webp" alt="Mây Yoga" class="logo-img"></a>
      <ul class="nav-links" id="navLinks">
        <li><a href="../index.html">Trang chủ</a></li>
        <li><a href="../ve-may-yoga.html">Về Mây Yoga</a></li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle" style="color:#d4af37; font-weight:600;">Các khoá học <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../hoc-yoga-online.html">🌿 Yoga Online 1:1</a></li>
            <li><a href="../goc-huan-luyen-vien.html">🦉 Đào tạo YTT 200H</a></li>
          </ul>
        </li>
        <li class="nav-dropdown">
          <a href="#" class="dropdown-toggle">Kiến thức Yoga <span class="chevron">▾</span></a>
          <ul class="dropdown-menu">
            <li><a href="../bai-viet/yoga-cho-nguoi-moi.html">🌱 Yoga cho người mới</a></li>
            <li><a href="../tu-the-yoga.html">🧘 90 Tư thế Yoga</a></li>
            <li><a href="../bai-viet/pranayama-ky-thuat-tho.html">🌬️ Pranayama</a></li>
            <li><a href="../bai-viet/thien-cho-nguoi-moi.html">🕊️ Thiền định</a></li>
            <li><a href="../giai-phau-yoga.html">🫀 Giải phẫu Yoga</a></li>
            <li style="border-top:1px solid rgba(61,90,58,0.1); margin-top:4px; padding-top:4px;"><a href="../tu-tap-tai-nha.html">🏠 Tự tập tại nhà</a></li>
          </ul>
        </li>
        <li><a href="../trac-nghiem.html">Trắc nghiệm</a></li>
      </ul>
      <div class="nav-search" id="navSearch">
        <input type="text" id="globalSearch" placeholder="🔍 Tìm tư thế, bài viết..." autocomplete="off">
        <div class="search-dropdown" id="searchDropdown"></div>
      </div>
      <div class="nav-cta"><a href="../index.html#blog" class="btn btn-primary btn-sm">Khám phá ngay</a></div>
      <button class="mobile-toggle" id="mobileToggle" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </nav>

  <section class="pose-hero">
    <div class="container">
      <div class="pose-breadcrumb">
        <a href="../index.html">Trang chủ</a>
        <span class="sep">›</span>
        <a href="../tu-the-yoga.html">Tư thế Yoga</a>
        <span class="sep">›</span>
        <span>{html_escape(vn)}</span>
      </div>
      <div class="pose-hero-grid">
        <div class="pose-hero-info">
          <div class="pose-tags">
            <span class="pose-tag pose-tag--category">{html_escape(cat_name)}</span>
            <span class="pose-tag pose-tag--level {lc}">{level}</span>
          </div>
          <h1>{html_escape(vn)}</h1>
          <p class="pose-hero-sanskrit">{html_escape(san)}</p>
          <p class="pose-hero-pron">🔊 {html_escape(pron)}</p>
          <p class="pose-hero-eng">{html_escape(eng)}</p>
          <p class="pose-hero-intro">{html_escape(intro)}</p>
        </div>
        <div class="pose-hero-img">
          <img src="../{img}" alt="{html_escape(vn)}" loading="eager">
        </div>
      </div>
    </div>
  </section>

  <div class="pose-layout">
    <div class="container pose-layout-inner">
      <aside class="pose-toc">
        <nav class="pose-toc-nav">
          <h4>📑 Nội dung</h4>
          <ul>
            <li><a href="#benefits">Lợi ích</a></li>
            <li><a href="#howto">Cách thực hiện</a></li>
            <li><a href="#alignment">Mẹo căn chỉnh</a></li>
            <li><a href="#contra">Chống chỉ định</a></li>
            <li><a href="#modifications">Biến thể & Điều chỉnh</a></li>
            <li><a href="#mistakes">Lỗi thường gặp</a></li>
            <li><a href="#avoid">Khi nào nên tránh</a></li>
            <li><a href="#why">Tại sao nên tập</a></li>
            <li><a href="#faq">Câu hỏi thường gặp</a></li>
          </ul>
        </nav>
      </aside>

      <main class="pose-content">
        <section class="pose-section" id="benefits">
          <h2>✅ Lợi ích của {html_escape(vn)}</h2>
          <div class="pose-benefits-grid">
{benefits_html}
          </div>
        </section>

        <section class="pose-section" id="howto">
          <h2>🧘 Cách thực hiện {html_escape(vn)}</h2>
          <ol class="pose-steps-list">
{steps_html}
          </ol>
        </section>

        <section class="pose-section" id="alignment">
          <h2>🎯 Mẹo căn chỉnh</h2>
          <div class="pose-alignment-tips">
{tips_html}
          </div>
          <div class="pose-cueing-section">
            <h3>💬 Gợi ý Cueing cho Huấn luyện viên</h3>
{cues_html}
          </div>
        </section>

        <section class="pose-section" id="contra">
          <h2>⚠️ Chống chỉ định</h2>
          <div class="pose-contra-list">
{contra_html}
          </div>
        </section>

        <section class="pose-section" id="modifications">
          <h2>🔄 Biến thể & Điều chỉnh</h2>
          <div class="pose-mods-grid">
            <div>
              <h3 style="color:var(--mint-600); margin-bottom:16px;">Điều chỉnh (Dễ hơn)</h3>
{mods_html}
            </div>
            <div>
              <h3 style="color:#B45309; margin-bottom:16px;">Biến thể (Thử thách)</h3>
{vars_html}
            </div>
          </div>
        </section>

        <section class="pose-section" id="mistakes">
          <h2>❌ Lỗi thường gặp</h2>
          <div class="pose-mistakes-list">
{mistakes_html}
          </div>
        </section>

        <section class="pose-section" id="avoid">
          <h2>🚫 Khi nào nên tránh hoặc điều chỉnh</h2>
          <div class="pose-avoid-list">
{avoid_html}
          </div>
        </section>

        <section class="pose-section" id="why">
          <h2>💚 Tại sao nên tập {html_escape(vn)}?</h2>
          <div class="pose-why-callout">
            <p>{html_escape(why)}</p>
          </div>
        </section>

        <section class="pose-section" id="faq">
          <h2>❓ Câu hỏi thường gặp</h2>
          <div class="pose-faq-list">
{faq_html}
          </div>
        </section>
      </main>
    </div>
  </div>

  <section class="pose-related-section">
    <div class="container">
      <h2>🧘 Tư thế liên quan</h2>
      <div class="pose-related-scroll">
{related_html}      </div>
    </div>
  </section>

  <section class="cta-banner">
    <div class="container">
      <h2>Khám phá thêm tư thế Yoga</h2>
      <p>Thư viện 90 tư thế với hướng dẫn chi tiết từ giáo viên RYT500.</p>
      <a href="../tu-the-yoga.html" class="btn btn-primary">Xem tất cả 90 tư thế →</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container" style="text-align:center; padding: 40px 0 20px;">
      <a href="../index.html" class="nav-logo" style="display:inline-flex; justify-content:center; margin-bottom:12px;">
        <img src="../assets/images/logo.webp" alt="Mây Yoga" class="logo-img" style="height:48px; border-radius:10px; padding:4px; background:rgba(255,255,255,0.12); backdrop-filter:blur(6px);">
      </a>
      <p style="color:rgba(255,255,255,0.9); margin:0 auto 16px; font-size:0.9rem;">Nền tảng kiến thức Hatha Yoga cho mọi người.<br></p>
      <div style="display:flex; gap:12px; justify-content:center; align-items:center; margin-bottom:20px;">
        <a href="mailto:phanthumay.yoga500@gmail.com" aria-label="Email" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s; text-decoration:none;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg></a>
        <a href="https://zalo.me/0326808864" target="_blank" aria-label="Zalo" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s; text-decoration:none;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg></a>
        <a href="https://www.facebook.com/profile.php?id=61573065832463" target="_blank" aria-label="Facebook" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
        <a href="https://www.instagram.com/thumay2808" target="_blank" aria-label="Instagram" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg></a>
        <a href="https://www.tiktok.com/@my.v.yoga" target="_blank" aria-label="TikTok" style="display:inline-flex; width:34px; height:34px; background:rgba(255,255,255,0.12); border-radius:50%; align-items:center; justify-content:center; transition:all 0.3s;" onmouseover="this.style.background='rgba(255,255,255,0.25)'" onmouseout="this.style.background='rgba(255,255,255,0.12)'"><svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
      </div>
      <p style="color:rgba(255,255,255,0.7); font-size: 0.82rem; line-height: 1.6; margin: 0 auto 16px; max-width: 600px;">
        <strong>Chủ quản:</strong> Phan Thu Mây &nbsp;|&nbsp; <strong>MST:</strong> 066195013103<br>
      </p>
      <div style="display:flex; gap:16px; justify-content:center; flex-wrap:wrap; margin-bottom:20px; font-size:0.8rem;">
        <a href="../chinh-sach-bao-mat.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Bảo mật thông tin</a>
        <a href="../dieu-khoan-su-dung.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Điều khoản sử dụng</a>
        <a href="../chinh-sach-thanh-toan.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Thanh toán</a>
        <a href="../chinh-sach-doi-tra.html" style="color:rgba(255,255,255,0.7); text-decoration:none;">Khiếu nại & Hoàn tiền</a>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15); padding-top:16px; max-width:300px; margin:0 auto;">
        <p style="color:rgba(255,255,255,0.6); font-size:0.8rem; margin:0;">© 2026 MâyYoga.health 🍀</p>
      </div>
    </div>
  </footer>

  <div class="floating-contact" id="floatingContact">
    <a href="https://zalo.me/0326808864" target="_blank" class="fc-zalo" data-tooltip="Chat Zalo" aria-label="Liên hệ Zalo">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-2.2 28.8h-2.6c-3.8 0-6.8-1.2-9-3.4l.6-2.4c2 2.2 4.8 3.4 8.4 3.4h2.6v2.4zm10.6-4.8c-.6 1-1.6 1.6-2.8 1.6H27v-2.4h2.6c.4 0 .8-.2 1-.6.2-.4.2-.8 0-1.2l-3.4-6.8c-.4-.8-.2-1.8.4-2.4.6-.6 1.6-.8 2.4-.4l5 2.8c.8.4 1.2 1.2 1.2 2.2 0 0-.2 5.2-2.8 7.2z"/></svg>
    </a>
    <a href="https://wa.me/84326808864" target="_blank" class="fc-whatsapp" data-tooltip="Chat WhatsApp" aria-label="Liên hệ WhatsApp">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>
  </div>

  <script src="../js/main.js"></script>
  <script src="../js/search-index.js"></script>
  <script src="../js/search.js"></script>
  <script>
    const tocLinks = document.querySelectorAll('.pose-toc-nav a');
    const sections = document.querySelectorAll('.pose-section');
    window.addEventListener('scroll', () => {{
      let current = '';
      sections.forEach(s => {{ if (window.scrollY >= s.offsetTop - 200) current = s.id; }});
      tocLinks.forEach(a => {{
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + current) a.classList.add('active');
      }});
    }});
    const mt = document.getElementById('mobileToggle');
    const nl = document.getElementById('navLinks');
    if (mt) mt.addEventListener('click', () => {{ nl.classList.toggle('active'); mt.classList.toggle('active'); }});
    window.addEventListener('scroll', () => {{ document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50); }});
  </script>

  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "{html_escape(vn)} — {html_escape(san)}",
    "description": "{html_escape(desc)}",
    "url": "https://mayyoga.health/tu-the/{slug}.html",
    "image": "https://mayyoga.health/{img}",
    "inLanguage": "vi",
    "author": {{ "@type": "Person", "name": "Mây — RYT500", "url": "https://mayyoga.health/ve-may-yoga.html" }},
    "publisher": {{ "@type": "Organization", "name": "Mây Yoga", "logo": {{ "@type": "ImageObject", "url": "https://mayyoga.health/assets/images/logo.webp" }} }}
  }}
  </script>
</body>
</html>'''

# ─── Main ─────────────────────────────────────────────────────────
def main():
    categories, poses = parse_js_data(DATA_FILE)
    cat_map = {c['id']: c.get('name', c['id']) for c in categories}
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    generated = []
    for pose in poses:
        san = pose['san']
        vn = pose['vn']
        cat_id = pose['cat']
        cat_name = cat_map.get(cat_id, cat_id)
        slug = get_slug(vn)

        eng_data = ENG_MAP.get(san, (san, san.lower()))
        eng, pron = eng_data

        html = generate_html(pose, cat_name, slug, eng, pron, poses, cat_id)
        filepath = os.path.join(OUTPUT_DIR, f'{slug}.html')
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        generated.append((slug, vn, san))
        print(f'  ✅ {slug}.html — {vn} ({san})')

    print(f'\n🎉 Đã tạo {len(generated)} trang chi tiết tư thế trong tu-the/')

    # Generate sitemap entries
    sitemap_path = os.path.join(SCRIPT_DIR, 'sitemap_poses.txt')
    with open(sitemap_path, 'w', encoding='utf-8') as f:
        for slug, vn, san in generated:
            f.write(f'https://mayyoga.health/tu-the/{slug}.html\n')
    print(f'📄 Danh sách URL lưu tại sitemap_poses.txt')

if __name__ == '__main__':
    main()
