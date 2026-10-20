# B、C 手機與電腦 APP v2｜使用與 Google 設定
版本日期：2026-10-20

## 先開始使用
1. 分別解壓縮 B-personal-v2.zip 或 C-community-v2.zip，用 Chrome／Safari／Edge 開啟 index.html。無須找 Work 入口。
2. 本機任務功能不需登入。手機長期使用及 Google 連線，請部署到 GitHub Pages 的 HTTPS 網址。
3. 全部程式在 index.html 內，可直接修改；不需要套件安裝或建置。
4. 本次提供可部署的專案，沒有代為公開部署，也沒有替你建立 Google Cloud 專案或完成真實帳號授權。

## 八項需求對應
1. 不使用 ICS。Google 設定及授權完成後，任務卡「一鍵加入 Google 行事曆」直接呼叫 Google Calendar API 建立事件；之後按「更新 Google 行事曆」更新同一筆。
2. 新增／編輯有手動分類、資料夾、主要聯繫人、開始／結束日期與時間、全天、提前通知數量與分鐘／小時／天、紅黃綠藍紫灰標題、追蹤進度／內容。
3. 卡片顯示上述內容，可依社區、分類、資料夾、聯繫人、顏色交叉篩選。分類或資料夾標籤可直接點擊。
4. 已完成、未完成、超期任務、已到期均為可點選的統計卡，點選後列出明細，再點同一張卡取消。
5. 行事曆顯示週末及 2026、2027 年臺灣官方辦公日曆的節日／補假。其他年份只顯示週末，不臆測國定假日。
6. Google 授權後讀取自己的及已分享／訂閱行事曆，原有 Google 行程可出現在 APP 月曆。可輸入已獲授權的日曆 ID 加入 Google 日曆清單；對方仍需先分享。只有「顯示忙碌」權限時，不能讀取詳細內容。
7. C 的社區名稱與社區標籤可點擊，顯示該社區任務數與內容。
8. 所屬社區、分類、資料夾、主要聯繫人、廠商、負責人、處理階段、優先級均為手動清單。全新資料不預塞名稱。紅黃綠藍紫灰及四個統計狀態為功能選項，不是管理名冊。

## 手動清單
- 可先在「手動清單管理」新增名稱。
- 也可直接在任務表單輸入新名稱，儲存任務時會加入清單。
- 改名會同步更新使用該名稱的本機任務；使用中的名稱須先移轉任務後才能刪除。
- 主要聯繫人只會存於本機資料，不會自動讀 Gmail 通訊錄，不會自動寄信或邀請對方。
- C 保留手動廠商、聯絡方式、費用、負責人、下次保養日期。下次保養由卡片按鈕手動建立。
- 「國聚之碩／玉京名廈／厚禮／區權會」自行加入後，側欄仍分別以藍／灰／綠／紅識別。任務標題六種顏色可自行選擇。

## 日期時間與統計
- 全部任務時間採 Asia/Taipei 臺北時間。
- 已完成／未完成：依任務完成勾選。
- 超期任務：尚未完成且已超過結束日期時間。
- 已到期：今天結束、尚未完成。可能與超期任務重疊。
- 只填結束日期而沒有時間，會用當天 23:59:59 判斷；全天任務亦同。
- 統計依目前分類、資料夾、社區等條件計算，狀態卡本身不重複限制統計。
- Google 事件必須有完整起迄日期與時間；全天事件只需日期。Google 事件結束須晚於開始。
- 本機任務可只填期限，但要加入 Google 時，須補齊起迄欄位。
- 跨日任務會出現在起迄日期的每一天。Google 月曆行程為快取，最後成功讀取時間列在連線頁。
- 套用任務分類等篩選時，月曆只顯示符合條件的本機待辦；未分類的 Google 原行程可在 Gmail 行事曆頁完整查看。

## 提前通知
- 例如 2 天、3 小時、15 分鐘；也可填 0，表示開始當下通知。
- 留白不設定個別提醒。Google 上限為開始前 28 天，APP 會驗證。
- 可勾「沿用 Google 日曆預設提醒」，此時上方通知數量不生效。由 Google 匯入且使用預設提醒的事件，更新時會保留此設定。
- 必須成功加入／更新 Google 事件，才由 Google 行事曆提供通知。手機是否通知，仍由 Google 行事曆、帳號、瀏覽器／手機系統設定決定。
- APP 單純的本機任務，不會在關閉網頁後背景推播。

## 只使用 Gmail／Google 帳號的一次性設定
Gmail 帳號是 Google 帳號，可用同一帳號管理 Google Cloud 與 Google 行事曆。
目前沒有你的 OAuth 用戶端 ID，所以下列設定尚未替你完成，無法聲稱已成功同步。
APP 不需要你的 Gmail 密碼，也不要把 Google Client Secret 放進 HTML。

1. 先部署 APP，取得固定 HTTPS 網址。例如：
   B：https://你的帳號.github.io/personal-todo/
   C：https://你的帳號.github.io/community-desk/
2. 用你的 Gmail 帳號進入 Google Cloud Console：https://console.cloud.google.com/
3. 建立或選擇專案，在 API 程式庫啟用 Google Calendar API。
4. 在 Google Auth Platform／OAuth 同意設定，設定應用程式名稱、支援信箱及目標對象。若使用測試模式，將實際登入的 Gmail 加為測試使用者。
5. 建立「網頁應用程式」類型 OAuth 用戶端 ID。
6. Authorized JavaScript origins（已授權 JavaScript 來源）填完整來源：
   https://你的帳號.github.io
   只填通訊協定與主機，不加 /personal-todo/ 之類的路徑。
   本機測試則依實際使用的 localhost 來源設定；正式使用建議 HTTPS。
7. 此 APP 使用 token popup 流程，無須在前端放 Client Secret，也沒有自建後端保存 refresh token。
8. 在 APP「Gmail 行事曆」填入結尾為 .apps.googleusercontent.com 的公開用戶端 ID，按「儲存連線設定」。
9. 按「連結 Gmail／Google 行事曆」，由你選擇帳號並同意所需行事曆權限：
   https://www.googleapis.com/auth/calendar.events
   https://www.googleapis.com/auth/calendar.calendarlist
   不索取 Gmail 信件讀取、寄送或通訊錄權限。
10. 連線後選擇「新增任務送到哪個行事曆」，並儲存設定。只列可編輯的日曆；其他人的唯讀行事曆不能寫入。
11. 選取要顯示的日曆與讀取日期範圍，按「立即讀取同步」。預設讀取今年至明年底，可自行調整。大量行程時請縮短範圍。
12. 若提供給測試名單以外的人，需依 Google 當時 OAuth 發布與驗證要求辦理，不能把「測試可用」當成已完成對外驗證。
13. B、C 若使用同一 OAuth 用戶端 ID，撤銷該用戶端的授權可能影響另一套 APP；需要時重新授權。

## Google 同步到底同步哪些資料
- APP → Google：按任務卡一鍵新增／更新，送出標題、開始／結束、全天、標題顏色對應、追蹤內容、提醒。
- Google → APP：按「立即讀取同步」，或在 APP 開啟且授權有效時每 2 分鐘讀取；自己的及已選共享日曆行程會出現在月曆。
- 既有 Google 行程可按「加入待辦並分類」，然後自行填分類／資料夾／聯繫人。
- 已關聯的任務會帶回 Google 改過的標題、時間、內容、顏色、提醒。若本機也有待送出修改，會保留本機並標示衝突。
- 本機變更不會偷偷覆蓋 Google；按「更新 Google 行事曆」才送出。若雙方都有修改，先匯出備份，再選「採用 Google 版本」後重新編輯。
- Google 修改時以事件版本檢查避免遺失更新；初次建立使用固定識別碼減少重試重複建立。
- Google 已刪除的事件會標示衝突，保留本機資料。可解除關聯後自行決定如何處理。
- APP 刪除任務僅刪除本機，Google 事件仍保留；不會替你刪除別人的行程。
- 分類、資料夾、聯繫人、社區、完成狀態等屬本機任務管理，不會自動跨裝置同步；換裝置用備份還原。
- 這不是有後端的持續雲端同步。關閉網頁後不輪詢，重新整理或授權過期後需再次連線。Google 本身的事件與通知仍由 Google 維持。
- 不能只靠輸入對方 Gmail 就取得私密行事曆。需先由對方在 Google 設定分享，或已訂閱公開日曆。
- 本機顯示日曆勾選僅控制 APP 顯示；新增共享日曆的按鈕會實際加入你的 Google 日曆清單。

## 更新舊版與備份
1. 舊版先按匯出備份，保留原 ZIP／HTML。
2. 若沿用同一瀏覽器及相同網站來源，新版會讀取舊版 localStorage，轉換分類、期限、內容、完成狀態；舊儲存鍵不會刪除或覆寫。
3. 如果使用另一份本機 HTML，瀏覽器可能視為不同儲存區。請用「備份與說明 → 還原備份」選原本的舊版 JSON。
4. 支援此聊天交付的 v1 與本次 v2 備份；B、C 不可混用。還原會先驗證，再要求覆蓋確認。
5. Google 事件快取與權杖不放進一般備份。還原後需重新連線 Google。
6. 清除瀏覽器資料、無痕模式或更換網址可能失去本機資料，請定期備份。備份為明文，不要上傳公開 GitHub 儲存庫。
7. 儲存／讀取失敗時不覆寫損壞原檔，可匯出原始資料協助恢復。

## GitHub Pages 部署
1. B、C 各建立一個可啟用 Pages 的儲存庫。
2. 將對應 ZIP 內的 index.html、.nojekyll、README.md 放在儲存庫根目錄，不要只上傳 ZIP。
3. Settings → Pages → Deploy from a branch → main → /(root) → Save。
4. 以 Pages 顯示的網址開啟，並設定上述 Google OAuth 網頁來源。
5. 手機用該網址開啟，再由瀏覽器加入主畫面。是網頁 APP，沒有原生安裝包、離線快取或關閉後背景同步。

## 資料來源與授權
- 2026、2027 辦公日曆：行政院人事行政總處，政府資料開放授權條款第 1 版。
  https://data.gov.tw/dataset/14718
- Google OAuth token 模式：
  https://developers.google.com/identity/oauth2/web/guides/use-token-model
- 網頁 OAuth 來源設定：
  https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid
- Google Calendar 事件：
  https://developers.google.com/workspace/calendar/api/v3/reference/events/insert
- 分享／訂閱日曆：
  https://developers.google.com/workspace/calendar/api/v3/reference/calendarList/insert
- GitHub Pages：
  https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 驗證限制
資料與模擬 API 測試結果見「驗證紀錄.md」。本輪瀏覽器控制工具因無法可靠辨識網址而中止，未完成新版實際 UI、實體手機或真實 Gmail OAuth 往返驗證。沒有假稱 Google 已成功連線。

