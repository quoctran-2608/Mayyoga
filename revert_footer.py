import os
import re

root_dir = '/Users/phanthumay/Desktop/mayyoga.health/web'

legal_block_pattern = re.compile(
    r'\s*<!-- FOOTER LEGAL BLOCK -->\s*<div style="color:rgba\(255,255,255,0\.7\); font-size: 0\.85rem; line-height: 1\.8; margin-bottom: 24px; border-bottom: 1px solid rgba\(255,255,255,0\.1\); padding-bottom: 24px; max-width: 500px; margin-left: auto; margin-right: auto;">.*?</div>',
    re.DOTALL
)

count = 0
for dp, dn, fns in os.walk(root_dir):
    for fn in fns:
        if fn.endswith('.html'):
            path = os.path.join(dp, fn)
            with open(path, "r", encoding="utf-8") as f:
                html = f.read()

            orig_html = html
            html = re.sub(legal_block_pattern, '', html)

            if html != orig_html:
                with open(path, "w", encoding="utf-8") as f:
                    f.write(html)
                count += 1

print(f"Removed BCT block in {count} files!")
