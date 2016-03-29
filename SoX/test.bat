"C:\Program Files (x86)\sox-14-4-2\sox.exe" -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length Avatar-ChrisG-s500 header2.raw trim 0 0.1
"C:\Program Files (x86)\sox-14-4-2\sox.exe" -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length Avatar-ChrisG-s500 image2.raw trim 0.1 50
"C:\Program Files (x86)\sox-14-4-2\sox.exe" -t raw -r 16k -e a-law -D -b 8 -c 1 --ignore-length image2.raw modified2.raw gain -2
copy /b header2.raw + modified2.raw recombine32.raw

pause