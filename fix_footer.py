import re

with open("bai-viet/yoga-tai-nha.html", "r", encoding="utf-8") as f:
    tai_nha = f.read()

footer_match = re.search(r'(<footer class="footer">.*?</footer>)', tai_nha, re.DOTALL)
if footer_match:
    good_footer = footer_match.group(1)
    
    with open("bai-viet/yoga-cho-dau-than-kinh-toa.html", "r", encoding="utf-8") as f:
        target = f.read()
        
    old_footer_match = re.search(r'(<footer class="footer".*?</footer>)', target, re.DOTALL)
    if old_footer_match:
        old_footer = old_footer_match.group(1)
        target = target.replace(old_footer, good_footer)
        
        with open("bai-viet/yoga-cho-dau-than-kinh-toa.html", "w", encoding="utf-8") as f:
            f.write(target)
        print("Replaced footer successfully!")
    else:
        print("target footer not found")
else:
    print("good footer not found")
