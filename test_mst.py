import urllib.request
import re

url = "https://masothue.com/Search/?q=066195013103"
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    }
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        # Try to find tax code in the table
        matches = re.findall(r'<th>Mã số thuế.*?<td>.*?<a.*?>(.*?)</a>', html, re.DOTALL | re.IGNORECASE)
        if matches:
            for m in matches:
                print("FOUND MST: ", m.strip())
        else:
            print("MST not found in HTML. Snippet:")
            print(html[:500])
except Exception as e:
    print("Error:", e)
