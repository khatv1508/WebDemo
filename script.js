(function () {
  /* ---------- Dữ liệu prompt ---------- */
  var OPS = [
    { id: "all", name: "Tất cả" },
    { id: "nguon", name: "Ai viết, để làm gì" },
    { id: "thongtin", name: "Hiểu nội dung" },
    { id: "tincay", name: "Có đáng tin không" },
    { id: "doichieu", name: "So hai nguồn" },
    { id: "kiemchung", name: "Kiểm tra lời AI" },
    { id: "ontap", name: "Ôn bài" }
  ];
  var FIELD_LABEL = { bai: "Tên bài / chủ đề", tulieu: "Đoạn tư liệu", y: "Ý của em (viết trước)", sukien: "Sự kiện", a: "Tư liệu A", b: "Tư liệu B", sgk: "Đoạn SGK", ai: "Câu trả lời của AI" };
  var LONG = { tulieu: 1, y: 1, a: 1, b: 1, sgk: 1, ai: 1 };
  var FIELD_HINT = {
    bai: "Tự điền theo chủ đề em đã chọn ở trên. Có thể sửa thành tên bài cụ thể.",
    tulieu: "Một đoạn văn bản lịch sử em cần phân tích: khung \"Tư liệu\" trong SGK, đoạn trích giáo viên giao, hoặc trích sử liệu gốc. Không dán câu trả lời của AI vào đây.",
    y: "Viết suy nghĩ của em trước, vài dòng là đủ. AI sẽ kiểm tra ý này chứ không làm thay em.",
    sukien: "Sự kiện mà cả hai tư liệu cùng nói đến.",
    a: "Tư liệu thứ nhất về sự kiện, ví dụ một đoạn trong SGK.",
    b: "Tư liệu thứ hai về cùng sự kiện, ví dụ đoạn trích từ sử liệu gốc hoặc sách tham khảo.",
    sgk: "Chép đoạn SGK nói về cùng nội dung em vừa hỏi AI.",
    ai: "Dán câu trả lời chatbot vừa đưa cho em."
  };
  var GRADES = [{"id": "10", "name": "Khối 10", "badge": "Demo", "sub": "Chủ đề 6. Một số nền văn minh trên đất nước Việt Nam (trước năm 1858)", "groups": [{"name": "Chủ đề 6. Một số nền văn minh trên đất nước Việt Nam (trước năm 1858)", "items": ["Bài 11. Một số nền văn minh cổ trên đất nước Việt Nam", "Bài 12. Văn minh Đại Việt"]}], "topics": ["Bài 11. Một số nền văn minh cổ trên đất nước Việt Nam", "Bài 12. Văn minh Đại Việt"]}, {"id": "11", "name": "Khối 11", "badge": "Trọng tâm", "sub": "Chủ đề 4, 5, 6 về lịch sử Việt Nam và Giáo dục địa phương Đà Nẵng", "groups": [{"name": "Chủ đề 4. Chiến tranh bảo vệ Tổ quốc và chiến tranh giải phóng dân tộc trong lịch sử Việt Nam (trước Cách mạng tháng Tám năm 1945)", "items": ["Bài 7. Khái quát về chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam", "Bài 8. Một số cuộc khởi nghĩa và chiến tranh giải phóng trong lịch sử Việt Nam (từ thế kỉ III TCN đến cuối thế kỉ XIX)"]}, {"name": "Chủ đề 5. Một số cuộc cải cách lớn trong lịch sử Việt Nam", "items": ["Bài 9. Cuộc cải cách của Hồ Quý Ly và triều Hồ (đầu thế kỉ XV)", "Bài 10. Cuộc cải cách của Lê Thánh Tông (thế kỉ XV)", "Bài 11. Cuộc cải cách của Minh Mạng (nửa đầu thế kỉ XIX)"]}, {"name": "Chủ đề 6. Lịch sử bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông", "items": ["Bài 12. Vị trí và tầm quan trọng của Biển Đông", "Bài 13. Việt Nam và Biển Đông"]}, {"name": "Giáo dục địa phương thành phố Đà Nẵng lớp 11", "items": ["Chủ đề 1. Truyền thống yêu nước và cách mạng của quê hương (GDĐP Đà Nẵng 11)"]}], "topics": ["Bài 7. Khái quát về chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam", "Bài 8. Một số cuộc khởi nghĩa và chiến tranh giải phóng trong lịch sử Việt Nam (từ thế kỉ III TCN đến cuối thế kỉ XIX)", "Bài 9. Cuộc cải cách của Hồ Quý Ly và triều Hồ (đầu thế kỉ XV)", "Bài 10. Cuộc cải cách của Lê Thánh Tông (thế kỉ XV)", "Bài 11. Cuộc cải cách của Minh Mạng (nửa đầu thế kỉ XIX)", "Bài 12. Vị trí và tầm quan trọng của Biển Đông", "Bài 13. Việt Nam và Biển Đông", "Chủ đề 1. Truyền thống yêu nước và cách mạng của quê hương (GDĐP Đà Nẵng 11)"]}, {"id": "12", "name": "Khối 12", "badge": "Demo", "sub": "Chủ đề 3. Cách mạng tháng Tám năm 1945, chiến tranh giải phóng dân tộc và chiến tranh bảo vệ Tổ quốc", "groups": [{"name": "Chủ đề 3. Cách mạng tháng Tám năm 1945, chiến tranh giải phóng dân tộc và chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam (từ tháng 8 năm 1945 đến nay)", "items": ["Bài 6. Cách mạng tháng Tám năm 1945", "Bài 7. Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)", "Bài 8. Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)", "Bài 9. Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay"]}], "topics": ["Bài 6. Cách mạng tháng Tám năm 1945", "Bài 7. Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)", "Bài 8. Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)", "Bài 9. Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay"]}];
  var SOURCES = {"Bài 11. Một số nền văn minh cổ trên đất nước Việt Nam": [{"title": "Đại Việt sử ký toàn thư · Ngoại kỷ", "kind": "Sử liệu viết (bản dịch)", "text": "Hùng Vương lên ngôi, đặt quốc hiệu là Văn Lang, chia nước làm 15 bộ. Đặt tướng văn gọi là Lạc hầu, tướng võ gọi là Lạc tướng, con trai vua gọi là Quan lang, con gái vua gọi là Mị nương.", "note": "Toàn thư được biên soạn từ thế kỉ XV, chép lại truyền thuyết về một thời kì rất xa trước đó. Câu hỏi hay để thảo luận: tư liệu này tin được đến đâu?"}], "Bài 12. Văn minh Đại Việt": [{"title": "Lý Công Uẩn · Chiếu dời đô (1010)", "kind": "Văn kiện (bản dịch)", "text": "Huống gì thành Đại La, kinh đô cũ của Cao Vương: ở vào nơi trung tâm trời đất; được cái thế rồng cuộn hổ ngồi. Đã đúng ngôi nam bắc đông tây; lại tiện hướng nhìn sông dựa núi.", "note": "Có nhiều bản dịch khác nhau về câu chữ."}, {"title": "Thân Nhân Trung · Bài ký đề danh tiến sĩ khoa Nhâm Tuất (1442), soạn năm 1484", "kind": "Văn bia (bản dịch)", "text": "Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh mà hưng thịnh, nguyên khí suy thì thế nước yếu mà thấp hèn. Vì thế các bậc đế vương thánh minh không đời nào không coi việc giáo dục nhân tài, kén chọn kẻ sĩ, vun trồng nguyên khí quốc gia làm công việc cần thiết.", "note": "Bia được dựng ở Văn Miếu năm 1484, dưới triều Lê Thánh Tông."}], "Bài 7. Khái quát về chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam": [{"title": "Bài thơ Nam quốc sơn hà (bản dịch thơ)", "kind": "Thơ văn (bản dịch)", "text": "Sông núi nước Nam vua Nam ở\nRành rành định phận ở sách trời\nCớ sao lũ giặc sang xâm phạm\nChúng mày nhất định phải tan vỡ.", "note": "Tác giả, thời điểm ra đời của bài thơ còn được giới nghiên cứu tranh luận; bài thơ thường gắn với kháng chiến chống Tống thời Lý. Có nhiều bản dịch thơ."}, {"title": "Trần Quốc Tuấn · Hịch tướng sĩ (trước kháng chiến chống Mông – Nguyên lần thứ hai)", "kind": "Văn kiện (bản dịch)", "text": "Ta thường tới bữa quên ăn, nửa đêm vỗ gối, ruột đau như cắt, nước mắt đầm đìa; chỉ căm tức chưa xả thịt, lột da, nuốt gan, uống máu quân thù. Dẫu cho trăm thân này phơi ngoài nội cỏ, nghìn xác này gói trong da ngựa, ta cũng vui lòng.", "note": "Có nhiều bản dịch khác nhau về câu chữ."}, {"title": "Lời Quang Trung dụ tướng sĩ trước khi tiến quân đánh quân Thanh (1788 – 1789)", "kind": "Lời truyền lại (chép trong sách đời sau)", "text": "Đánh cho để dài tóc,\nĐánh cho để đen răng,\nĐánh cho nó chích luân bất phản,\nĐánh cho nó phiến giáp bất hoàn,\nĐánh cho sử tri Nam quốc anh hùng chi hữu chủ.", "note": "Câu này được chép lại trong sách đời sau, các bản chép có khác nhau đôi chút. Hãy hỏi AI nghĩa của các cụm chữ Hán."}], "Bài 8. Một số cuộc khởi nghĩa và chiến tranh giải phóng trong lịch sử Việt Nam (từ thế kỉ III TCN đến cuối thế kỉ XIX)": [{"title": "Lê Văn Hưu · lời bàn trong Đại Việt sử ký (thế kỉ XIII), chép lại trong Đại Việt sử ký toàn thư", "kind": "Lời bình của sử gia (bản dịch)", "text": "Trưng Trắc, Trưng Nhị là đàn bà, hô một tiếng mà các quận Cửu Chân, Nhật Nam, Hợp Phố và 65 thành ở Lĩnh Ngoại đều hưởng ứng, việc dựng nước xưng vương dễ như trở bàn tay.", "note": "Đây là lời nhận xét của sử gia sống sau sự kiện hơn 1 000 năm, không phải ghi chép đương thời. Thử hỏi AI: điều đó ảnh hưởng gì đến độ tin cậy?"}, {"title": "Nguyễn Trãi · Bình Ngô đại cáo (1428), bản dịch Ngô Tất Tố", "kind": "Văn kiện (bản dịch)", "text": "Việc nhân nghĩa cốt ở yên dân,\nQuân điếu phạt trước lo trừ bạo.\nNhư nước Đại Việt ta từ trước,\nVốn xưng nền văn hiến đã lâu."}], "Bài 9. Cuộc cải cách của Hồ Quý Ly và triều Hồ (đầu thế kỉ XV)": [{"title": "Lời Hồ Nguyên Trừng (đầu thế kỉ XV), chép trong sử cũ", "kind": "Lời nói được chép lại", "text": "Thần không sợ đánh, chỉ sợ lòng dân không theo.", "note": "Hồ Nguyên Trừng là con trưởng của Hồ Quý Ly. Câu này thường được dùng để bàn về hạn chế của cuộc cải cách và nguyên nhân thất bại của nhà Hồ."}], "Bài 10. Cuộc cải cách của Lê Thánh Tông (thế kỉ XV)": [{"title": "Thân Nhân Trung · Bài ký đề danh tiến sĩ khoa Nhâm Tuất (1442), soạn năm 1484", "kind": "Văn bia (bản dịch)", "text": "Hiền tài là nguyên khí của quốc gia, nguyên khí thịnh thì thế nước mạnh mà hưng thịnh, nguyên khí suy thì thế nước yếu mà thấp hèn. Vì thế các bậc đế vương thánh minh không đời nào không coi việc giáo dục nhân tài, kén chọn kẻ sĩ, vun trồng nguyên khí quốc gia làm công việc cần thiết.", "note": "Bia được dựng ở Văn Miếu năm 1484, dưới triều Lê Thánh Tông."}], "Bài 12. Vị trí và tầm quan trọng của Biển Đông": [{"title": "Đại Nam thực lục chính biên, đệ nhị kỷ, quyển 165 · lời Bộ Công tâu năm 1836 (Minh Mạng thứ 17)", "kind": "Chính sử triều Nguyễn (bản dịch)", "text": "Cương giới mặt biển nước ta có xứ Hoàng Sa rất là hiểm yếu, đã phái vẽ bản đồ mà hình thế nó xa rộng, mới chỉ được một nơi…", "note": "Đoạn trích ngắn, có lược bớt. Đây là văn bản của nhà nước phong kiến Việt Nam ghi việc quản lí Hoàng Sa."}], "Bài 13. Việt Nam và Biển Đông": [{"title": "Lê Quý Đôn · Phủ biên tạp lục (1776)", "kind": "Sử liệu viết (bản dịch)", "text": "Trước họ Nguyễn đặt đội Hoàng Sa 70 suất, lấy người xã An Vĩnh sung vào, cắt phiên mỗi năm cứ đến tháng ba nhận giấy sai đi, mang lương đủ ăn 6 tháng, đi bằng 5 chiếc thuyền câu nhỏ, ra biển ba ngày ba đêm thì đến đảo ấy."}, {"title": "Đại Nam thực lục chính biên, đệ nhị kỷ, quyển 165 · lời Bộ Công tâu năm 1836 (Minh Mạng thứ 17)", "kind": "Chính sử triều Nguyễn (bản dịch)", "text": "Cương giới mặt biển nước ta có xứ Hoàng Sa rất là hiểm yếu, đã phái vẽ bản đồ mà hình thế nó xa rộng, mới chỉ được một nơi…", "note": "Đoạn trích ngắn, có lược bớt. Đây là văn bản của nhà nước phong kiến Việt Nam ghi việc quản lí Hoàng Sa."}, {"title": "Lời thiếu úy Trần Văn Phương tại Trường Sa (1988)", "kind": "Lời kể, được ghi lại", "text": "Thà hi sinh chứ không chịu mất đảo. Hãy để cho máu của mình tô thắm lá cờ truyền thống của quân chủng Hải quân.", "note": "Dẫn theo Tài liệu Giáo dục địa phương thành phố Đà Nẵng lớp 11."}], "Chủ đề 1. Truyền thống yêu nước và cách mạng của quê hương (GDĐP Đà Nẵng 11)": [{"title": "Phạm Văn Đồng nhận xét về mặt trận Đà Nẵng (1946)", "kind": "Trích dẫn qua tài liệu địa phương", "text": "So sánh với toàn quốc, mặt trận Đà Nẵng được liệt vào hạng đánh mạnh nhất và dẻo dai nhất.", "note": "Dẫn theo Tài liệu Giáo dục địa phương thành phố Đà Nẵng lớp 11."}, {"title": "Phong trào Duy Tân ở Quảng Nam (đầu thế kỉ XX)", "kind": "Khẩu hiệu", "text": "Khai dân trí, chấn dân khí, hậu dân sinh.", "note": "Khẩu hiệu gắn với Phan Châu Trinh và phong trào Duy Tân. Dẫn theo Tài liệu GDĐP thành phố Đà Nẵng lớp 11."}, {"title": "Nguyễn Duy Hiệu (Nghĩa hội Quảng Nam 1885 – 1887)", "kind": "Thơ, lời truyền lại", "text": "Chìm nổi trên đời ai đó tá\nChớ đem thành bại luận anh hùng.", "note": "Theo tài liệu, ông đọc hai câu này tại pháp trường. Dẫn theo Tài liệu GDĐP thành phố Đà Nẵng lớp 11."}], "Bài 6. Cách mạng tháng Tám năm 1945": [{"title": "Hồ Chí Minh · Tuyên ngôn Độc lập (2/9/1945)", "kind": "Văn kiện", "text": "Nước Việt Nam có quyền hưởng tự do và độc lập, và sự thực đã thành một nước tự do, độc lập. Toàn thể dân Việt Nam quyết đem tất cả tinh thần và lực lượng, tính mạng và của cải để giữ vững quyền tự do, độc lập ấy."}], "Bài 7. Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)": [{"title": "Hồ Chí Minh · Lời kêu gọi toàn quốc kháng chiến (19/12/1946)", "kind": "Văn kiện", "text": "Chúng ta muốn hòa bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta một lần nữa! Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ."}, {"title": "Hồ Chí Minh · Lời kêu gọi toàn quốc kháng chiến (19/12/1946), đoạn sau", "kind": "Văn kiện", "text": "Hỡi đồng bào! Chúng ta phải đứng lên! Bất kỳ đàn ông, đàn bà, bất kỳ người già, người trẻ, không chia tôn giáo, đảng phái, dân tộc. Hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp để cứu Tổ quốc."}], "Bài 8. Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)": [{"title": "Hồ Chí Minh · Lời kêu gọi đồng bào và chiến sĩ cả nước (17/7/1966)", "kind": "Văn kiện", "text": "Chiến tranh có thể kéo dài 5 năm, 10 năm, 20 năm hoặc lâu hơn nữa. Hà Nội, Hải Phòng và một số thành phố, xí nghiệp có thể bị tàn phá, song nhân dân Việt Nam quyết không sợ! Không có gì quý hơn độc lập, tự do."}], "Bài 9. Cuộc đấu tranh bảo vệ Tổ quốc từ sau tháng 4 – 1975 đến nay": [{"title": "Lời thiếu úy Trần Văn Phương tại Trường Sa (1988)", "kind": "Lời kể, được ghi lại", "text": "Thà hi sinh chứ không chịu mất đảo. Hãy để cho máu của mình tô thắm lá cờ truyền thống của quân chủng Hải quân.", "note": "Dẫn theo Tài liệu Giáo dục địa phương thành phố Đà Nẵng lớp 11."}]};
  function gradeOf(id) { return GRADES.filter(function (g) { return g.id === id; })[0]; }

  var PROMPTS = [
    { op: "nguon", title: "Ai viết, khi nào, để làm gì?", why: "Em tự trả lời 4 câu hỏi về nguồn, AI chỉ nhận xét.",
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Đây là một đoạn tư liệu: \"{tulieu}\".\nĐừng giải thích nội dung vội. Hãy hỏi tôi lần lượt 4 câu: ai viết, viết khi nào, viết cho ai, nhằm mục đích gì. Chờ tôi trả lời từng câu rồi mới nhận xét. Nếu tư liệu không đủ căn cứ để trả lời thì nói rõ là không đủ." },
    { op: "nguon", title: "Sử liệu gốc hay thứ cấp?", why: "Em phân loại nguồn trước, AI kiểm tra lập luận.",
      t: "Tôi là học sinh THPT, đang học {bai}. Tôi có đoạn tư liệu: \"{tulieu}\".\nTôi nghĩ đây là: {y}.\nHãy hỏi tôi 2 câu để kiểm tra lập luận của tôi, rồi cho biết tôi phân loại đúng hay chưa và vì sao. Không thêm thông tin ngoài tư liệu; nếu không chắc thì nói \"tôi không chắc\"." },
    { op: "thongtin", title: "Tư liệu nói gì?", why: "Tách điều tư liệu nói trực tiếp với suy luận của em.",
      t: "Tôi là học sinh THPT. Với đoạn tư liệu \"{tulieu}\" ({bai}), tôi tự viết trước các ý chính: {y}.\nHãy kiểm tra từng ý: ý nào tư liệu nói trực tiếp, ý nào là suy luận của tôi. Mỗi nhận xét phải trích nguyên văn câu trong tư liệu làm căn cứ. Không thêm thông tin ngoài tư liệu." },
    { op: "tincay", title: "Tin được đến đâu?", why: "Em tự chấm theo tiêu chí trước, rồi mới so với AI.",
      t: "Tôi là học sinh THPT. Tư liệu \"{tulieu}\" thuộc {bai}. Đừng đánh giá ngay.\nHãy cho tôi 3 tiêu chí đánh giá độ tin cậy của một tư liệu lịch sử. Tôi sẽ tự chấm từng tiêu chí, sau đó bạn so sánh với đánh giá của bạn. Nếu bạn không chắc về tác giả hay niên đại, hãy nói \"tôi không chắc\" thay vì đoán." },
    { op: "tincay", title: "Người viết đứng ở đâu?", why: "Tìm từ ngữ thể hiện thái độ của người viết.",
      t: "Tôi là học sinh THPT. Trong đoạn tư liệu \"{tulieu}\", hãy chỉ ra những từ ngữ thể hiện thái độ hoặc quan điểm của người viết. Đừng kết luận tư liệu đúng hay sai. Kết thúc bằng câu hỏi: vì sao người viết lại chọn những từ đó? Để tôi tự trả lời." },
    { op: "doichieu", title: "So hai nguồn", why: "Bảng giống – khác, em tự rút kết luận.",
      t: "Tôi là học sinh THPT. Tôi có hai tư liệu về {sukien}.\nTư liệu A: \"{a}\"\nTư liệu B: \"{b}\"\nHãy lập bảng 3 cột: điểm giống, điểm khác, lý do có thể dẫn đến khác biệt (vị trí tác giả, thời điểm viết). Không kết luận thay tôi; kết thúc bằng một câu hỏi để tôi tự kết luận." },
    { op: "kiemchung", title: "Đánh dấu chỗ cần kiểm tra", why: "Dùng ngay sau khi AI trả lời, không cần điền gì.",
      t: "Trong câu trả lời vừa rồi của bạn, hãy liệt kê mọi tên người, năm, số liệu mà tôi cần kiểm tra lại, và gợi ý loại nguồn nên kiểm tra (SGK, sử liệu gốc, trang của bảo tàng). Không được tạo đường link hoặc tên sách mà bạn không chắc là có thật." },
    { op: "kiemchung", title: "AI so với SGK", why: "Đặt câu trả lời của AI cạnh SGK để tìm chỗ lệch.",
      t: "Tôi là học sinh THPT. Đây là đoạn SGK Lịch sử {lop}: \"{sgk}\".\nĐây là câu trả lời của một chatbot: \"{ai}\".\nHãy chỉ ra các điểm không khớp giữa hai đoạn, mỗi điểm trích nguyên văn từ cả hai bên. Không nói bên nào đúng; tôi sẽ tự kiểm tra." },
    { op: "ontap", title: "Hỏi – đáp ôn tập cùng AI", why: "Ôn bài mà không bị lộ đáp án trước.",
      t: "Tôi là học sinh THPT, đang ôn tập {bai}, Lịch sử {lop}. Hãy hỏi tôi từng câu một về nội dung này, từ dễ đến khó, tổng 5 câu. Không đưa đáp án trước khi tôi trả lời. Sau mỗi câu, chỉ ra chỗ tôi đúng, chỗ còn thiếu, và gợi ý loại tư liệu nên đọc thêm." }
  ];

  var state = { filter: "all", grade: "10", topic: "", src: "", values: PROMPTS.map(function () { return {}; }), open: -1 };
  var opName = {}; OPS.forEach(function (o) { opName[o.id] = o.name; });

  function esc(x) { return String(x).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function fieldsOf(t) { var out = [], m, re = /\{(\w+)\}/g; while ((m = re.exec(t))) { if (m[1] !== "lop" && out.indexOf(m[1]) < 0) out.push(m[1]); } return out; }
  function val(i, k) {
    if (k === "lop") return state.grade;
    var raw = state.values[i][k];
    if (k === "bai" && raw == null) raw = state.topic;
    if (k === "tulieu" && raw == null) raw = state.src;
    raw = (raw || "").trim();
    if (k === "tulieu" && PROMPTS[i].op === "nguon" && KNOWN_SRC.indexOf(raw) >= 0) raw = raw.replace(/\n\([^\n]*\)$/, "");
    return raw;
  }
  function srcText(s) { return s.text + "\n(" + s.title + ")"; }
  var KNOWN_SRC = []; Object.keys(SOURCES).forEach(function (k) { SOURCES[k].forEach(function (s) { KNOWN_SRC.push(srcText(s)); }); });
  function fillText(i) { return PROMPTS[i].t.replace(/\{(\w+)\}/g, function (_, k) { return val(i, k) || "[" + FIELD_LABEL[k] + "]"; }); }
  function fillHtml(i) {
    return PROMPTS[i].t.split(/(\{\w+\})/g).map(function (part) {
      var m = part.match(/^\{(\w+)\}$/);
      if (!m) return esc(part);
      if (m[1] === "lop") return esc(state.grade);
      var v = val(i, m[1]);
      return v ? '<span class="fill">' + esc(v) + "</span>" : '<span class="ph">[' + esc(FIELD_LABEL[m[1]]) + "]</span>";
    }).join("");
  }
  function copyText(text, el) {
    function done(msg) { el.textContent = msg; setTimeout(function () { el.textContent = ""; }, 2200); }
    try { navigator.clipboard.writeText(text).then(function () { done("Đã sao chép"); }, function () { done("Chưa sao chép được, hãy bôi đen để chép"); }); }
    catch (e) { done("Chưa sao chép được, hãy bôi đen để chép"); }
  }

  /* ---------- Bộ lọc + thẻ prompt ---------- */
  var filtersEl = document.getElementById("filters");
  OPS.forEach(function (o) {
    var n = o.id === "all" ? PROMPTS.length : PROMPTS.filter(function (p) { return p.op === o.id; }).length;
    var b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.id = "f-" + o.id;
    b.innerHTML = esc(o.name) + '<span class="count">' + n + "</span>";
    b.addEventListener("click", function () { state.filter = o.id; renderFilters(); renderBank(); });
    filtersEl.appendChild(b);
  });
  function renderFilters() { OPS.forEach(function (o) { document.getElementById("f-" + o.id).setAttribute("aria-pressed", o.id === state.filter ? "true" : "false"); }); }

  var bankEl = document.getElementById("bank");
  var wzReady = false;
  function renderBank() {
    if (wzReady) renderWizard();
    bankEl.innerHTML = "";
    PROMPTS.forEach(function (p, i) {
      if (state.filter !== "all" && p.op !== state.filter) return;
      var card = document.createElement("article");
      card.className = "card";
      card.innerHTML =
        '<div class="meta"><span class="tag">' + esc(opName[p.op]) + '</span><span>Phiếu ' + String(i + 1).padStart(2, "0") + "</span></div>" +
        "<h3>" + esc(p.title) + '</h3><p class="why">' + esc(p.why) + "</p>" +
        '<p class="excerpt">' + fillHtml(i) + "</p>" +
        '<div class="card-actions"><button class="btn" type="button" id="use' + i + '">Dùng prompt này</button>' +
        '<button class="btn-text" type="button" id="qc' + i + '">Sao chép nhanh</button><span class="copied" id="qok' + i + '" aria-live="polite"></span></div>';
      bankEl.appendChild(card);
      document.getElementById("use" + i).addEventListener("click", function () { openDialog(i); });
      document.getElementById("qc" + i).addEventListener("click", function () { copyText(fillText(i), document.getElementById("qok" + i)); });
    });
  }

  /* ---------- Hộp điền prompt ---------- */
  var dlg = document.getElementById("dlg");
  function openDialog(i) {
    var p = PROMPTS[i]; state.open = i;
    document.getElementById("dlg-no").textContent = "Phiếu " + String(i + 1).padStart(2, "0");
    document.getElementById("dlg-tag").textContent = opName[p.op];
    document.getElementById("dlg-title").textContent = p.title;
    document.getElementById("dlg-why").textContent = p.why;
    var fields = fieldsOf(p.t), box = document.getElementById("dlg-fields");
    var dTopic = val(i, "bai"), dSrc = SOURCES[dTopic] || [];
    var exRow = fields.indexOf("tulieu") < 0 ? "" : (dSrc.length
      ? '<div class="ex-row ex-list"><span class="ex-head">Tư liệu gợi ý cho chủ đề này</span>' + dSrc.map(function (s, n) { return '<button class="ex-chip" type="button" data-n="' + n + '">' + esc(s.title) + "</button>"; }).join("") + '</div><p class="ex-note" id="ex-note" hidden></p>'
      : '<div class="ex-row"><span>' + (dTopic ? "Chủ đề này chưa có tư liệu gợi ý. Hãy dùng khung \"Tư liệu\" trong SGK bài này." : "Chọn chủ đề (ô Tên bài bên dưới) để xem tư liệu gợi ý.") + "</span></div>");
    box.innerHTML = fields.length ? exRow + fields.map(function (k) {
      var id = "fld-" + k, v = esc(k === "bai" || k === "tulieu" ? val(i, k) : (state.values[i][k] || "")), hint = FIELD_HINT[k] ? '<span class="fld-hint">' + esc(FIELD_HINT[k]) + "</span>" : "";
      if (LONG[k]) return '<label class="full" for="' + id + '">' + esc(FIELD_LABEL[k]) + hint + '<textarea id="' + id + '" data-k="' + k + '" placeholder="Dán hoặc gõ vào đây">' + v + "</textarea></label>";
      return '<div class="full fields-item"><label for="' + id + '">' + esc(FIELD_LABEL[k]) + hint + '</label><div class="combo" id="bai-combo"><input id="' + id + '" data-k="' + k + '" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="bai-list" value="' + v + '" placeholder="Chọn hoặc gõ tên bài"><div class="combo-btns"><button type="button" class="combo-clear" aria-label="Xóa tên bài" hidden>×</button><button type="button" class="combo-toggle" aria-label="Mở danh sách chủ đề" tabindex="-1"><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div><ul class="combo-list" id="bai-list" role="listbox" hidden></ul></div></div>';
    }).join("") : '<p class="hint full">Prompt này dùng ngay sau khi chatbot vừa trả lời em, không cần điền gì.</p>';
    box.querySelectorAll(".ex-chip").forEach(function (b) {
      b.addEventListener("click", function () {
        var s = dSrc[+b.getAttribute("data-n")], text = srcText(s);
        state.values[i].tulieu = text;
        document.getElementById("fld-tulieu").value = text;
        var note = document.getElementById("ex-note");
        note.textContent = s.kind + (s.note ? ". " + s.note : "") + (p.op === "nguon" ? " Phiếu này ẩn dòng ghi nguồn trong prompt để em tự xác định nguồn trước." : "");
        note.hidden = false;
        updatePreview();
      });
    });
    box.querySelectorAll("[data-k]").forEach(function (inp) {
      inp.addEventListener("input", function () { state.values[i][inp.getAttribute("data-k")] = inp.value; updatePreview(); });
    });
    var bc = document.getElementById("bai-combo");
    if (bc) makeCombo(bc, {
      typing: true,
      groups: function () {
        var cur = gradeOf(state.grade);
        return cur.groups.map(function (gp) { return { name: cur.name + " · " + gp.name, items: gp.items }; }).concat(GRADES.filter(function (g) { return g !== cur; }).map(function (g) { return { name: g.name + " (demo)", items: g.topics }; }));
      },
      selected: function () { return val(i, "bai"); },
      pick: function (t) { state.values[i].bai = t; updatePreview(); },
      clear: function () { state.values[i].bai = ""; updatePreview(); }
    });
    updatePreview();
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    var first = box.querySelector("[data-k]"); if (first) first.focus();
  }
  function updatePreview() { var i = state.open; document.getElementById("dlg-preview").innerHTML = fillHtml(i); }
  function closeDialog() { if (typeof dlg.close === "function") dlg.close(); else dlg.removeAttribute("open"); renderBank(); }
  document.getElementById("dlg-close").addEventListener("click", closeDialog);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) closeDialog(); });
  dlg.addEventListener("close", function () { renderBank(); });
  document.getElementById("dlg-copy").addEventListener("click", function () { var i = state.open; copyText(fillText(i), document.getElementById("dlg-copied")); });

  /* ---------- Ô chọn có danh sách (combo) ---------- */
  function norm(x) { return String(x).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase(); }
  function makeCombo(root, o) {
    var input = root.querySelector("input"), list = root.querySelector(".combo-list"),
        clearBtn = root.querySelector(".combo-clear"), toggle = root.querySelector(".combo-toggle"),
        opts = [], active = -1, filtering = false;
    function sync() { clearBtn.hidden = !input.value; }
    function render() {
      var q = filtering ? norm(input.value.trim()) : "", html = "", sel = o.selected();
      opts = [];
      o.groups().forEach(function (g) {
        var items = g.items.filter(function (t) { return !q || norm(t).indexOf(q) >= 0; });
        if (!items.length) return;
        if (g.name) html += '<li class="combo-group" role="presentation">' + esc(g.name) + "</li>";
        items.forEach(function (t) {
          html += '<li class="combo-opt" role="option" data-n="' + opts.length + '" aria-selected="' + (t === sel ? "true" : "false") + '">' + esc(t) + "</li>";
          opts.push(t);
        });
      });
      list.innerHTML = html || '<li class="combo-empty">Không có chủ đề khớp. Em vẫn có thể giữ tên bài vừa gõ.</li>';
      active = Math.max(0, opts.indexOf(sel));
      mark();
    }
    function mark() {
      list.querySelectorAll(".combo-opt").forEach(function (li) {
        var on = +li.getAttribute("data-n") === active;
        li.classList.toggle("active", on);
        if (on) li.scrollIntoView({ block: "nearest" });
      });
    }
    function open() { if (!list.hidden) return; filtering = false; render(); list.hidden = false; root.classList.add("open"); input.setAttribute("aria-expanded", "true"); }
    function close() { list.hidden = true; root.classList.remove("open"); input.setAttribute("aria-expanded", "false"); }
    function pick(n) { var t = opts[n]; if (t == null) return; input.value = t; o.pick(t); sync(); close(); }
    input.addEventListener("click", function () { list.hidden ? open() : close(); });
    if (o.typing) input.addEventListener("input", function () { filtering = true; render(); list.hidden = false; root.classList.add("open"); sync(); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault(); if (list.hidden) open();
        active = (active + (e.key === "ArrowDown" ? 1 : -1) + opts.length) % Math.max(opts.length, 1); mark();
      } else if (e.key === "Enter" && !list.hidden && opts.length) { e.preventDefault(); pick(active); }
      else if (e.key === "Escape" && !list.hidden) { e.preventDefault(); e.stopPropagation(); close(); }
    });
    list.addEventListener("mousedown", function (e) { e.preventDefault(); });
    list.addEventListener("click", function (e) { var li = e.target.closest(".combo-opt"); if (li) pick(+li.getAttribute("data-n")); });
    toggle.addEventListener("mousedown", function (e) { e.preventDefault(); });
    toggle.addEventListener("click", function () { if (list.hidden) { input.focus(); open(); } else close(); });
    clearBtn.addEventListener("mousedown", function (e) { e.preventDefault(); });
    clearBtn.addEventListener("click", function () { input.value = ""; o.clear(); sync(); input.focus(); filtering = false; render(); list.hidden = false; root.classList.add("open"); });
    document.addEventListener("mousedown", function (e) { if (!root.contains(e.target)) close(); });
    input._sync = sync;
    sync();
    return { sync: sync, close: close };
  }

  /* ---------- Chọn khối + chủ đề ---------- */
  var gradesEl = document.getElementById("grades"), topicEl = document.getElementById("topic");
  var topicCombo = makeCombo(document.getElementById("topic-combo"), {
    groups: function () { return gradeOf(state.grade).groups; },
    selected: function () { return state.topic; },
    pick: function (t) { state.topic = t; state.src = ""; renderSources(); renderBank(); updateStepStates(); goStep("b2"); },
    clear: function () { state.topic = ""; state.src = ""; renderSources(); renderBank(); }
  });
  GRADES.forEach(function (g) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "grade"; b.id = "g-" + g.id; b.setAttribute("role", "tab");
    b.innerHTML = "<b>" + esc(g.name) + ' <em class="badge' + (g.badge === "Demo" ? " demo" : "") + '">' + esc(g.badge) + "</em></b><span>" + esc(g.sub) + "</span>";
    b.addEventListener("click", function () { setGrade(g.id); setTimeout(function () { document.getElementById("topic").click(); }, 50); });
    gradesEl.appendChild(b);
  });
  function setGrade(id) {
    state.grade = id; state.topic = "";
    var g = gradeOf(id);
    GRADES.forEach(function (x) { document.getElementById("g-" + x.id).setAttribute("aria-selected", x.id === id ? "true" : "false"); });
    topicEl.value = ""; topicEl.placeholder = "Tất cả chủ đề khối " + id; topicCombo.sync(); topicCombo.close();
    state.src = ""; renderSources(); renderBank();
  }
  function renderSources() {
    var panel = document.getElementById("src-panel"), list = SOURCES[state.topic] || [];
    if (!state.topic) { panel.innerHTML = '<p class="src-empty">Chọn bài ở bước 1 để xem các đoạn tư liệu gợi ý.</p>'; return; }
    panel.innerHTML = '<div class="src-head"><b>Tư liệu gợi ý · ' + esc(state.topic) + '</b><span>Bấm "Dùng tư liệu này" để chọn.</span></div>' +
      (list.length ? '<div class="src-grid">' + list.map(function (s, n) {
        var on = state.src === srcText(s);
        return '<article class="src-card' + (on ? " on" : "") + '"><span class="src-kind">' + esc(s.kind) + '</span><span class="src-title">' + esc(s.title) + '</span><p class="src-text">' + esc(s.text) + "</p>" + (s.note ? '<p class="src-note">' + esc(s.note) + "</p>" : "") +
          '<button class="btn" type="button" data-n="' + n + '">' + (on ? "Đang dùng ✓ (bấm để bỏ)" : "Dùng tư liệu này") + "</button></article>";
      }).join("") + "</div>" : '<p class="src-empty">Chủ đề này chưa có tư liệu gợi ý. Hãy dùng các khung "Tư liệu" trong SGK Lịch sử ' + esc(state.grade) + " bài này.</p>");
    panel.querySelectorAll(".src-card .btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = srcText(list[+b.getAttribute("data-n")]);
        state.src = state.src === t ? "" : t;
        var own = document.getElementById("own-src"); if (own) own.value = "";
        renderSources(); renderBank();
        updateStepStates(); if (state.src) goStep("b3");
      });
    });
  }
  renderFilters(); setGrade("11");

  /* ---------- Hướng dẫn sử dụng (tour) ---------- */
  var TOUR = [
    { sel: null, welcome: true, step: "Chào em!", title: "Học Lịch sử cùng AI, nhưng em vẫn là người nghĩ",
      html: '<p>Web không trả lời thay em. Web viết sẵn câu hỏi (prompt) để AI gợi ý, còn em tự đọc, tự nghĩ và tự kết luận.</p>' +
        '<ol class="tw-steps"><li><b>01</b>Chọn bài em đang học</li><li><b>02</b>Chọn một đoạn tư liệu</li><li><b>03</b>Chọn điều em muốn làm, sao chép prompt</li><li><b>04</b>Kiểm tra lại trước khi dùng</li></ol>' +
        '<p class="tw-note">Xem hướng dẫn mất khoảng 1 phút.</p>' },
    { sel: "#rq-open", step: "Trước tiên", title: "5 điều cần nhớ", body: "Làm nhanh 5 tình huống (khoảng 1 phút) để biết dùng AI thế nào là đúng. Em có thể làm ngay khi xem xong hướng dẫn." },
    { sel: "#b1 .grade-bar", step: "01", title: "Chọn bài em đang học", body: "Bấm Khối 11, rồi chọn bài trong ô Chủ đề, ví dụ Bài 7. Chọn xong, trang tự chuyển sang bước 02." },
    { sel: "#b2 .wiz-body", step: "02", title: "Chọn một đoạn tư liệu", body: "Web gợi ý sẵn tư liệu theo bài em chọn. Bấm \"Dùng tư liệu này\", hoặc mở dòng bên dưới để dán đoạn trong sách của em." },
    { sel: "#goals", step: "03", title: "Chọn điều em muốn làm", body: "Bấm câu giống điều em đang nghĩ. Web viết sẵn prompt: em điền ý của mình, bấm Sao chép rồi dán vào ChatGPT hoặc Gemini." },
    { sel: "#b4 .after-grid", step: "04", title: "Kiểm tra trước khi dùng", body: "AI trả lời xong, em tự hỏi 3 câu ngắn và tra lại tên người, năm tháng trong sách. Nộp bài có dùng AI thì tạo đoạn khai báo ở đây." },
    { sel: "#help-btn", step: "Xong rồi!", title: "Cần xem lại?", body: "Bấm nút Hướng dẫn trên thanh menu bất cứ lúc nào. Giờ mình làm 5 tình huống trước khi bắt đầu nhé." }
  ];
  var tour = { i: -1, els: null };
  function tourEls() {
    if (tour.els) return tour.els;
    var block = document.createElement("div"); block.className = "tour-block";
    var hole = document.createElement("div"); hole.className = "tour-hole";
    var tip = document.createElement("div"); tip.className = "tour-tip"; tip.setAttribute("role", "dialog"); tip.setAttribute("aria-live", "polite");
    tip.innerHTML = '<div class="tour-top"><div class="tour-step" id="t-step"></div><div class="tour-dots" id="t-dots"></div></div><h4 id="t-title"></h4><div id="t-body"></div><div class="tour-nav"><div class="tour-btns"><button class="btn-text" type="button" id="t-skip">Bỏ qua</button><button class="btn-text" type="button" id="t-prev">Quay lại</button><button class="btn" type="button" id="t-next">Tiếp</button></div></div>';
    block.addEventListener("click", function (e) { e.stopPropagation(); });
    document.body.appendChild(block); document.body.appendChild(hole); document.body.appendChild(tip);
    tour.els = { block: block, hole: hole, tip: tip };
    document.getElementById("t-skip").addEventListener("click", endTour);
    document.getElementById("t-prev").addEventListener("click", function () { showStep(tour.i - 1); });
    document.getElementById("t-next").addEventListener("click", function () { if (tour.i >= TOUR.length - 1) { endTour(); openRq(); } else showStep(tour.i + 1); });
    return tour.els;
  }
  function placeStep() {
    if (tour.i < 0) return;
    var s = TOUR[tour.i], e = tourEls(), target = s.sel ? document.querySelector(s.sel) : null;
    var tip = e.tip, hole = e.hole, vw = window.innerWidth, vh = window.innerHeight;
    if (target && target.offsetParent === null && s.sel !== "#help-btn") target = null;
    if (!target) {
      hole.className = "tour-hole center"; hole.style.cssText = "top:50%;left:50%;width:0;height:0;";
      tip.className = "tour-tip mid" + (s.welcome ? " welcome" : "");
      tip.style.left = Math.max(16, (vw - tip.offsetWidth) / 2) + "px";
      tip.style.top = Math.max(16, (vh - tip.offsetHeight) / 2) + "px";
      return;
    }
    var r = target.getBoundingClientRect(), pad = 8;
    hole.className = "tour-hole";
    hole.style.cssText = "top:" + (r.top - pad) + "px;left:" + (r.left - pad) + "px;width:" + (r.width + pad * 2) + "px;height:" + (r.height + pad * 2) + "px;";
    var tw = tip.offsetWidth, th = tip.offsetHeight, below = r.bottom + pad + 16 + th < vh || r.top < th + 40;
    if (r.bottom + pad + 16 + th > vh && r.top - pad - 16 - th < 64) {
      tip.className = "tour-tip mid dock";
      tip.style.left = Math.max(16, (vw - tw) / 2) + "px";
      tip.style.top = (vh - th - 16) + "px";
      return;
    }
    var cx = r.left + Math.min(r.width, 600) / 2;
    var left = Math.min(Math.max(16, cx - tw / 2), vw - tw - 16);
    tip.className = "tour-tip " + (below ? "below" : "above");
    tip.style.left = left + "px";
    tip.style.top = (below ? r.bottom + pad + 14 : r.top - pad - 14 - th) + "px";
    tip.style.setProperty("--ax", Math.min(Math.max(20, cx - left), tw - 20) + "px");
  }
  function showStep(n) {
    if (n < 0) n = 0;
    tour.i = n; tourEls();
    var s = TOUR[n];
    var stEl = document.getElementById("t-step");
    stEl.textContent = s.step; stEl.className = "tour-step" + (/^\d+$/.test(s.step) ? " num" : "");
    document.getElementById("t-title").textContent = s.title;
    document.getElementById("t-body").innerHTML = s.html || "<p>" + esc(s.body) + "</p>";
    document.getElementById("t-prev").hidden = n === 0;
    var last = n === TOUR.length - 1;
    document.getElementById("t-next").textContent = n === 0 ? "Xem hướng dẫn" : last ? "Làm 5 tình huống" : "Tiếp";
    document.getElementById("t-skip").textContent = n === 0 ? "Tự khám phá" : last ? "Để sau" : "Bỏ qua";
    document.getElementById("t-dots").innerHTML = TOUR.map(function (_, k) { return '<i class="' + (k === n ? "on" : "") + '"></i>'; }).join("");
    var target = s.sel ? document.querySelector(s.sel) : null;
    if (target && s.sel !== "#help-btn") {
      var r = target.getBoundingClientRect();
      if (r.top < 80 || r.bottom > window.innerHeight - 220) window.scrollTo({ top: window.scrollY + r.top - 110, behavior: "smooth" });
    }
    placeStep(); setTimeout(placeStep, 450);
    document.getElementById("t-next").focus();
  }
  function endTour() {
    tour.i = -1;
    if (tour.els) { ["block", "hole", "tip"].forEach(function (k) { tour.els[k].remove(); }); tour.els = null; }
    try { localStorage.setItem("ph-tour-done", "1"); } catch (e) {}
  }
  window.addEventListener("resize", placeStep);
  window.addEventListener("scroll", placeStep, { passive: true });
  document.addEventListener("keydown", function (e) {
    if (tour.i < 0) return;
    if (e.key === "Escape") endTour();
    else if (e.key === "ArrowRight") document.getElementById("t-next").click();
    else if (e.key === "ArrowLeft" && tour.i > 0) showStep(tour.i - 1);
  });
  document.getElementById("help-btn").addEventListener("click", function () { showStep(0); });
  var seen = false; try { seen = localStorage.getItem("ph-tour-done") === "1"; } catch (e) {}
  if (!seen) setTimeout(function () { showStep(0); }, 600);

  /* ---------- Quiz 5 quy tắc ---------- */
  var RQ = [
    { q: "Cô giao phân tích một đoạn tư liệu. Việc đầu tiên em làm là gì?", o: ["Dán ngay đoạn tư liệu vào chatbot, nhờ phân tích giúp.", "Tự đọc, ghi ra ý của mình, rồi mới nhờ AI nhận xét."], a: 1,
      rule: "Tự nghĩ trước, hỏi AI sau.", why: "Nếu để AI làm trước, em chỉ chép lại chứ không luyện được cách đọc tư liệu." },
    { q: "AI đưa ra năm tháng, tên một cuốn sách và một đường link nghe rất uy tín. Em làm gì?", o: ["Chép luôn vào bài, vì AI nói rất chắc chắn.", "Tra lại năm tháng trong sách giáo khoa, mở thử link; không mở được hay không tìm thấy sách thì không dùng."], a: 1,
      rule: "Kiểm chứng mọi tên, năm, con số và nguồn AI đưa ra.", why: "AI có thể nói sai, thậm chí bịa ra tên sách, đường link nghe rất thật. Em chỉ tin những gì mình tự tra và đọc được." },
    { q: "Sắp hết hạn nộp bài thuyết trình, em định nhờ AI viết hộ cả bài và trích lời AI làm dẫn chứng.", o: ["Tự viết bài, lấy dẫn chứng từ sách hoặc sử liệu; có dùng AI hỗ trợ thì khai báo ở cuối bài.", "Nộp luôn bài AI viết, chắc không ai biết."], a: 0,
      rule: "AI là bạn học, không phải người làm bài thay hay nguồn sử liệu.", why: "Bài nộp phải là bài của em. Dẫn chứng lịch sử phải có nguồn rõ ràng; khai báo dùng AI giống như ghi tài liệu tham khảo." },
    { q: "Em hỏi một chatbot nước ngoài về quần đảo Hoàng Sa.", o: ["Tin hoàn toàn, vì AI luôn trung lập.", "Đối chiếu câu trả lời với tài liệu chính thống của Việt Nam."], a: 1,
      rule: "Chủ quyền, biên giới, biển đảo: đối chiếu tài liệu chính thống của Việt Nam.", why: "Chatbot học từ dữ liệu khắp thế giới, có thể trình bày theo góc nhìn khác với quan điểm và chứng cứ của Việt Nam." },
    { q: "Bạn rủ em gửi họ tên, tên trường, ảnh thẻ học sinh cho AI, rồi nhờ nó viết đoạn chế giễu một anh hùng dân tộc cho vui.", o: ["Từ chối cả hai việc.", "Làm theo, chỉ là đùa thôi."], a: 0,
      rule: "Giữ an toàn và đúng mực.", why: "Không đưa thông tin cá nhân vào chatbot vì có thể bị lưu lại. Không nhờ AI tạo nội dung xuyên tạc hay chế giễu nhân vật, sự kiện lịch sử." }
  ];
  var rqI = 0, rqRes = [], rqCard = document.getElementById("rq-card"), rqDlg = document.getElementById("rq-dlg");
  function rqDots() { return '<div class="rq-dots">' + RQ.map(function (_, k) { return '<i class="' + (rqRes[k] === true ? "ok" : rqRes[k] === false ? "bad" : k === rqI ? "now" : "") + '"></i>'; }).join("") + "</div>"; }
  function rqRender() {
    var it = RQ[rqI];
    rqCard.innerHTML = '<div class="rq-top"><span>Tình huống ' + (rqI + 1) + "/" + RQ.length + "</span>" + rqDots() + "</div>" +
      '<p class="rq-q">' + esc(it.q) + '</p><div class="rq-opts">' +
      it.o.map(function (t, k) { return '<button type="button" class="rq-opt" data-k="' + k + '"><b>' + "AB"[k] + "</b><span>" + esc(t) + "</span></button>"; }).join("") +
      '</div><div id="rq-fb"></div><div class="rq-nav" id="rq-nav"></div>';
    rqCard.querySelectorAll(".rq-opt").forEach(function (b) {
      b.addEventListener("click", function () {
        var k = +b.getAttribute("data-k"), ok = k === it.a;
        rqRes[rqI] = ok;
        rqCard.querySelectorAll(".rq-opt").forEach(function (x, j) { x.disabled = true; if (j === it.a) x.classList.add("ok"); else if (j === k) x.classList.add("bad"); });
        document.getElementById("rq-fb").innerHTML = '<div class="rq-fb ' + (ok ? "ok" : "bad") + '"><span>' + (ok ? "Đúng rồi!" : "Chưa đúng, cách đúng là " + "AB"[it.a] + ".") + '</span><span class="rq-rule"><span>Điều ' + (rqI + 1) + ":</span> " + esc(it.rule) + "</span><p>" + esc(it.why) + "</p></div>";
        rqCard.querySelector(".rq-top .rq-dots").outerHTML = rqDots();
        var last = rqI === RQ.length - 1;
        document.getElementById("rq-nav").innerHTML = '<button class="btn" type="button" id="rq-next">' + (last ? "Xem kết quả" : "Tình huống tiếp →") + "</button>";
        var nx = document.getElementById("rq-next"); nx.focus();
        nx.addEventListener("click", function () { if (last) rqEnd(true); else { rqI++; rqRender(); } });
      });
    });
  }
  function rqStatus(score) {
    document.getElementById("rq-status").textContent = score == null ? "Em đã làm quiz này. Bấm để xem lại 5 điều cần nhớ." : "Em chọn đúng " + score + "/" + RQ.length + " tình huống. Bấm để xem lại 5 điều cần nhớ.";
    document.getElementById("rq-open").textContent = "Xem lại 5 điều cần nhớ";
  }
  function rqEnd(fresh) {
    var score = rqRes.filter(function (x) { return x === true; }).length;
    if (fresh) { try { localStorage.setItem("ph-rules-done", "1"); } catch (e) {} rqStatus(score); }
    rqCard.innerHTML = '<div class="rq-end"><h3>' + (fresh ? "Em chọn đúng " + score + "/" + RQ.length + " tình huống. " + (score === RQ.length ? "Xuất sắc!" : "Nhớ 5 điều dưới đây nhé.") : "5 điều cần nhớ") + "</h3>" +
      '<ol class="rq-rules">' + RQ.map(function (it) { return "<li><div><b>" + esc(it.rule) + "</b><span>" + esc(it.why) + "</span></div></li>"; }).join("") + "</ol>" +
      '<div class="rq-nav"><button class="btn-text" type="button" id="rq-again">Làm lại quiz</button><button class="btn" type="button" id="rq-go">Bắt đầu hỏi AI ↓</button></div></div>';
    document.getElementById("rq-again").addEventListener("click", function () { rqI = 0; rqRes = []; rqRender(); });
    document.getElementById("rq-go").addEventListener("click", function () { closeRq(); goStep("b1"); });
  }
  function openRq() {
    var done = false; try { done = localStorage.getItem("ph-rules-done") === "1"; } catch (e) {}
    if (done && !rqRes.length) rqEnd(false); else if (!rqRes.length) { rqI = 0; rqRender(); }
    if (typeof rqDlg.showModal === "function") rqDlg.showModal(); else rqDlg.setAttribute("open", "");
  }
  function closeRq() { if (typeof rqDlg.close === "function") rqDlg.close(); else rqDlg.removeAttribute("open"); }
  document.getElementById("rq-open").addEventListener("click", openRq);
  document.getElementById("rq-close").addEventListener("click", closeRq);
  rqDlg.addEventListener("click", function (e) { if (e.target === rqDlg) closeRq(); });
  var rqDone = false; try { rqDone = localStorage.getItem("ph-rules-done") === "1"; } catch (e) {}
  if (rqDone) rqStatus(null);

  /* ---------- Cuộn tới bước tiếp theo ---------- */
  var copiedOnce = false;
  function goStep(id) {
    var el = document.getElementById(id); if (!el) return;
    setTimeout(function () { el.scrollIntoView({ behavior: "smooth", block: "start" }); }, 120);
  }
  function updateStepStates() {
    var g = wz.goal ? goalOf(wz.goal) : null;
    var done = { b1: !!state.topic, b2: !!(state.src || "").trim(), b3: copiedOnce, b4: false };
    var cur = ["b1", "b2", "b3", "b4"].filter(function (k) { return !done[k]; })[0] || "b4";
    if (g && !g.needSrc && done.b1 && !done.b2) cur = done.b3 ? "b4" : "b3";
    ["b1", "b2", "b3", "b4"].forEach(function (k) {
      var el = document.getElementById(k); if (!el) return;
      el.classList.toggle("is-done", !!done[k] && k !== cur);
      el.classList.toggle("is-current", k === cur);
    });
  }

  /* ---------- 4 bước hỏi AI ---------- */
  var GOALS = [
    { id: "hieu", label: "Em chưa hiểu đoạn này nói gì", sub: "Nhờ AI chỉ ra chỗ em hiểu đúng, chỗ chưa đúng", skill: "Rút thông tin từ tư liệu", needSrc: true,
      ai: "Chỉ ra chỗ em hiểu đúng, chỗ hiểu sai, giải thích từ khó bằng lời dễ hiểu.", me: "Viết trước 1–2 câu: em hiểu đoạn này nói gì. Sai cũng không sao.",
      fields: [{ k: "y", label: "Em hiểu đoạn này nói gì?", hint: "Viết 1–2 câu bằng lời của em. Hiểu sai cũng không sao, AI sẽ chỉ cho em." }],
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Đây là một đoạn tư liệu:\n\"{tulieu}\"\n\nTôi hiểu đoạn này như sau: {y}\n\nHãy giúp tôi hiểu đúng hơn: chỉ ra ý nào tôi hiểu đúng, ý nào chưa đúng hoặc còn thiếu, và giải thích các từ khó bằng lời dễ hiểu. Mỗi nhận xét hãy trích câu chữ trong đoạn tư liệu làm căn cứ. Đừng kể thêm thông tin ngoài đoạn này.",
      dont: "Giải thích đoạn này giúp em.", doo: "Em hiểu đoạn này là…, hãy chỉ ra chỗ em hiểu sai.",
      chat: [["ai", "Em hiểu đúng ý chính là … Tuy nhiên câu \"…\" trong đoạn không nói như vậy. Từ \"…\" ở đây có nghĩa là …"], ["me", "À, vậy câu đó ý là …?"], ["ai", "Đúng rồi. Em thử viết lại ý chính của cả đoạn trong một câu nhé."]] },
    { id: "nguon", label: "Ai viết đoạn này, viết để làm gì?", sub: "AI hỏi lại, em tự tìm ra người viết và mục đích", skill: "Xác định nguồn tư liệu", needSrc: true,
      ai: "Hỏi em lần lượt 4 câu: ai viết, viết khi nào, viết cho ai, để làm gì.", me: "Tự trả lời từng câu; AI nhận xét sau mỗi câu.",
      fields: [],
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Đây là một đoạn tư liệu:\n\"{tulieu}\"\n\nĐừng giải thích nội dung vội. Hãy hỏi tôi lần lượt 4 câu: ai viết, viết khi nào, viết cho ai, viết để làm gì. Hỏi từng câu một, chờ tôi trả lời rồi mới nhận xét và hỏi câu tiếp. Nếu đoạn tư liệu không đủ căn cứ để trả lời câu nào thì nói rõ là không đủ.",
      dont: "Đoạn này của ai viết?", doo: "Hãy hỏi em từng câu để em tự tìm ra ai viết.",
      chat: [["ai", "Câu 1/4: Theo em, ai là người viết đoạn tư liệu này? Em dựa vào đâu?"], ["me", "Em nghĩ là … vì trong đoạn có nói …"], ["ai", "Em dựa vào câu chữ trong đoạn là cách làm đúng. Câu 2/4: Đoạn này được viết vào lúc nào?"]] },
    { id: "tincay", label: "Đoạn này có đáng tin không?", sub: "Học cách tự đánh giá một nguồn tư liệu", skill: "Đánh giá độ tin cậy", needSrc: true,
      ai: "Đưa ra 3 câu hỏi để em tự đánh giá, rồi so với đánh giá của AI.", me: "Tự trả lời 3 câu trước khi xem nhận xét của AI.",
      fields: [],
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Đây là một đoạn tư liệu:\n\"{tulieu}\"\n\nTôi muốn tự đánh giá xem đoạn này đáng tin đến đâu. Đừng đánh giá thay tôi. Hãy đưa ra 3 câu hỏi giúp tôi tự kiểm tra (ví dụ: người viết có chứng kiến sự việc không, viết sau sự việc bao lâu, viết nhằm mục đích gì). Chờ tôi trả lời xong cả 3 câu rồi mới nhận xét. Nếu không chắc về tác giả hay thời gian, hãy nói \"tôi không chắc\" thay vì đoán.",
      dont: "Đoạn này đúng hay sai?", doo: "Hãy cho em 3 câu hỏi để em tự đánh giá đoạn này.",
      chat: [["ai", "Câu 1: Người viết có sống cùng thời với sự việc không? Câu 2: … Câu 3: … Em trả lời từng câu nhé."], ["me", "Câu 1: Em nghĩ là không, vì …"], ["ai", "Lập luận hợp lý. Một nguồn viết sau nhiều năm vẫn có giá trị, nhưng em cần đối chiếu thêm với nguồn khác."]] },
    { id: "doichieu", label: "Hai nguồn nói khác nhau, nên tin bên nào?", sub: "So giống – khác, em tự kết luận", skill: "Đối chiếu tư liệu", needSrc: true,
      ai: "Lập bảng giống – khác và gợi ý lí do có thể khác nhau.", me: "Đọc bảng rồi tự kết luận nên tin bên nào, vì sao.",
      fields: [{ k: "b", label: "Đoạn tư liệu thứ hai", hint: "Dán đoạn từ sách giáo khoa hoặc nguồn khác nói về cùng sự việc. Đoạn thứ nhất là đoạn em chọn ở bước 2." }],
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Tôi có hai đoạn tư liệu nói về cùng một nội dung.\nĐoạn 1: \"{tulieu}\"\nĐoạn 2: \"{b}\"\n\nHãy lập bảng 3 cột: điểm giống, điểm khác, lí do có thể khiến hai đoạn khác nhau (ai viết, viết lúc nào, viết để làm gì). Đừng kết luận thay tôi. Cuối cùng hãy hỏi tôi một câu để tôi tự kết luận nên tin đoạn nào hơn và vì sao.",
      dont: "Đoạn nào đúng?", doo: "Hãy lập bảng giống – khác, để em tự kết luận.",
      chat: [["ai", "Bảng so sánh: Giống: … | Khác: … | Lí do có thể khác: đoạn 1 do … viết, đoạn 2 do … viết. Câu hỏi cho em: theo em, đoạn nào gần sự việc hơn?"], ["me", "Em nghĩ đoạn … vì …"]] },
    { id: "kiemtra", label: "AI vừa trả lời, em muốn kiểm tra lại", sub: "Liệt kê chỗ cần tra lại trong sách", skill: "Kiểm chứng thông tin AI", needSrc: false,
      ai: "Liệt kê mọi tên người, năm, con số cần kiểm tra và gợi ý nên tra ở đâu.", me: "Tra lại từng mục trong sách giáo khoa, đánh dấu mục nào khớp, mục nào không.",
      fields: [{ k: "ai", label: "Câu trả lời của chatbot", hint: "Dán nguyên văn câu trả lời em muốn kiểm tra." }],
      t: "Tôi là học sinh THPT, đang học {bai}, Lịch sử {lop}. Một chatbot đã trả lời tôi như sau:\n\"{ai}\"\n\nHãy liệt kê mọi tên người, địa danh, năm và con số trong câu trả lời đó mà tôi cần kiểm tra lại, và gợi ý tôi nên tra ở đâu (sách giáo khoa, sử liệu gốc, trang của bảo tàng). Mục nào bạn không chắc thì ghi rõ là không chắc. Không được bịa tên sách hoặc đường link.",
      dont: "Câu trả lời này đúng không?", doo: "Hãy liệt kê những chỗ em cần tra lại.",
      chat: [["ai", "Cần kiểm tra: 1) năm … (tra SGK Lịch sử 11, bài …); 2) tên … ; 3) con số … – mục này tôi không chắc."], ["me", "Em tra sách thấy năm … khớp, còn con số … thì sách ghi khác."]] },
    { id: "ontap", label: "Em muốn ôn bài trước khi kiểm tra", sub: "AI hỏi, em trả lời, không lộ đáp án trước", skill: "Ôn tập", needSrc: false,
      ai: "Hỏi em 5 câu từ dễ đến khó, nhận xét sau mỗi câu.", me: "Trả lời bằng trí nhớ trước, không mở sách.",
      fields: [],
      t: "Tôi là học sinh THPT, đang ôn tập {bai}, Lịch sử {lop}. Hãy hỏi tôi từng câu một về nội dung này, từ dễ đến khó, tổng 5 câu. Không đưa đáp án trước khi tôi trả lời. Sau mỗi câu, chỉ ra chỗ tôi đúng, chỗ còn thiếu. Nếu không chắc về một chi tiết, hãy nói rõ để tôi tự tra sách.",
      dont: "Tóm tắt bài này giúp em.", doo: "Hãy hỏi em từng câu, đừng cho đáp án trước.",
      chat: [["ai", "Câu 1/5 (dễ): …?"], ["me", "Em nghĩ là …"], ["ai", "Đúng một phần. Em còn thiếu ý … Câu 2/5: …?"]] }
  ];
  var DECL_PURPOSE = { hieu: "hiểu nội dung đoạn tư liệu", nguon: "xác định người viết và mục đích của tư liệu", tincay: "tự đánh giá độ tin cậy của tư liệu", doichieu: "so sánh hai nguồn tư liệu", kiemtra: "kiểm tra lại thông tin do AI đưa ra", ontap: "ôn tập theo dạng hỏi – đáp" };
  var wz = { goal: null, y: "", b: "", ai: "" };
  function goalOf(id) { return GOALS.filter(function (g) { return g.id === id; })[0]; }
  function wzVal(k, g) {
    if (k === "lop") return state.grade;
    if (k === "bai") return state.topic;
    if (k === "tulieu") {
      var t = (state.src || "").trim();
      if (g.id === "nguon" && KNOWN_SRC.indexOf(t) >= 0) t = t.replace(/\n\([^\n]*\)$/, "");
      return t;
    }
    return (wz[k] || "").trim();
  }
  var WZ_LABEL = { bai: "tên bài", tulieu: "đoạn tư liệu", y: "điều em hiểu", b: "đoạn tư liệu thứ hai", ai: "câu trả lời của chatbot" };
  function wzText(g) { return g.t.replace(/\{(\w+)\}/g, function (_, k) { return wzVal(k, g) || "[" + WZ_LABEL[k] + "]"; }); }
  function wzHtml(g) {
    return g.t.split(/(\{\w+\})/g).map(function (part) {
      var m = part.match(/^\{(\w+)\}$/);
      if (!m) return esc(part);
      if (m[1] === "lop") return esc(state.grade);
      var v = wzVal(m[1], g);
      return v ? '<span class="fill">' + esc(v) + "</span>" : '<span class="ph">[' + esc(WZ_LABEL[m[1]]) + "]</span>";
    }).join("");
  }
  var goalsEl = document.getElementById("goals"), detailEl = document.getElementById("goal-detail");
  GOALS.forEach(function (g) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "goal"; b.id = "goal-" + g.id; b.setAttribute("aria-pressed", "false");
    b.innerHTML = "<b>" + esc(g.label) + "</b><span>" + esc(g.sub) + "</span>";
    b.addEventListener("click", function () { wz.goal = g.id; renderWizard(true); });
    goalsEl.appendChild(b);
  });
  function setPicked() {
    var el = document.getElementById("picked"), t = (state.src || "").trim();
    if (!t) { el.className = "picked"; el.textContent = "Chưa chọn đoạn tư liệu."; return; }
    var hit = null;
    Object.keys(SOURCES).forEach(function (k) { SOURCES[k].forEach(function (s) { if (srcText(s) === t) hit = s; }); });
    el.className = "picked ok";
    el.textContent = "✓ Đang dùng: " + (hit ? hit.title : "đoạn tư liệu em dán");
  }
  function renderWizard(scroll) {
    setPicked(); updDecl(); updateStepStates();
    GOALS.forEach(function (g) { document.getElementById("goal-" + g.id).setAttribute("aria-pressed", wz.goal === g.id ? "true" : "false"); });
    if (!wz.goal) { detailEl.hidden = true; return; }
    var g = goalOf(wz.goal), warns = [];
    if (!state.topic) warns.push('Em chưa chọn bài. <a href="#b1">Quay lại bước 1</a>.');
    if (g.needSrc && !(state.src || "").trim()) warns.push('Em chưa chọn đoạn tư liệu. <a href="#b2">Quay lại bước 2</a>.');
    var keep = document.activeElement && document.activeElement.getAttribute && document.activeElement.getAttribute("data-wk");
    var fieldsHtml = g.fields.map(function (f) {
      return '<label class="gd-field" for="wk-' + f.k + '">' + esc(f.label) + "<span>" + esc(f.hint) + '</span><textarea id="wk-' + f.k + '" data-wk="' + f.k + '">' + esc(wz[f.k] || "") + "</textarea></label>";
    }).join("");
    if (keep) { updatePromptOnly(g, warns); return; }
    detailEl.hidden = false;
    detailEl.innerHTML =
      '<div class="gd-head"><h3>' + esc(g.label) + '</h3><span class="skill">Kĩ năng: ' + esc(g.skill) + "</span></div>" +
      '<div class="who"><div><b>AI sẽ</b>' + esc(g.ai) + '</div><div><b>Em sẽ</b>' + esc(g.me) + "</div></div>" +
      fieldsHtml +
      '<div id="gd-warn"></div>' +
      '<p class="prompt-label">Prompt của em (đã điền sẵn, phần tô đậm lấy từ các bước trên)</p>' +
      '<div class="exp-bar"><button type="button" class="exp-btn" id="gd-exp">⤢ Phóng to</button></div>' +
      '<div class="prompt-box" id="gd-prompt"></div>' +
      '<div class="go-row"><button class="btn" type="button" id="gd-copy">Sao chép prompt</button>' +
      '<a class="ext" href="https://chatgpt.com/" target="_blank" rel="noopener">Mở ChatGPT ↗</a>' +
      '<a class="ext" href="https://gemini.google.com/" target="_blank" rel="noopener">Mở Gemini ↗</a>' +
      '<span class="copied" id="gd-copied" aria-live="polite"></span></div>' +
      '<div class="warn" id="gd-next" hidden>Tiếp theo: dán prompt vào ChatGPT hoặc Gemini. Khi AI trả lời xong, <a href="#b4" id="gd-go4">sang bước 4 ↓</a></div>' +
      '<p class="tip">Mẹo: đừng hỏi <s>"' + esc(g.dont) + '"</s>, hãy hỏi kiểu "' + esc(g.doo) + '"</p>' +
      '<details class="sample"><summary>Xem ví dụ một cuộc hỏi – đáp</summary><div class="chat">' +
      g.chat.map(function (m) { return '<div class="msg ' + m[0] + '"><i>' + (m[0] === "ai" ? "AI" : "Em") + "</i>" + esc(m[1]) + "</div>"; }).join("") +
      '</div><p class="chat-note">Ví dụ minh hoạ cách trò chuyện, không phải nội dung lịch sử thật. Sau khi dán prompt, em cứ trả lời AI như đang nhắn tin.</p></details>';
    detailEl.querySelectorAll("[data-wk]").forEach(function (ta) {
      ta.addEventListener("input", function () { wz[ta.getAttribute("data-wk")] = ta.value; updatePromptOnly(g, null); });
    });
    document.getElementById("gd-copy").addEventListener("click", function () { copyText(wzText(g), document.getElementById("gd-copied")); copiedOnce = true; updateStepStates(); document.getElementById("gd-next").hidden = false; });
    document.getElementById("gd-go4").addEventListener("click", function (e) { e.preventDefault(); goStep("b4"); });
    detailEl.querySelectorAll(".ext").forEach(function (a) { a.addEventListener("click", function () { copiedOnce = true; updateStepStates(); document.getElementById("gd-next").hidden = false; goStep("b4"); }); });
    document.getElementById("gd-exp").addEventListener("click", function () { openReader("Prompt của em", { html: document.getElementById("gd-prompt").innerHTML }); });
    detailEl.querySelectorAll("[data-wk]").forEach(function (ta) {
      var lab = g.fields.filter(function (f) { return f.k === ta.getAttribute("data-wk"); })[0].label;
      ta.parentNode.insertBefore(expandBar(function () { openReader(lab, { textarea: ta }); }), ta);
    });
    updatePromptOnly(g, warns);
    if (scroll) detailEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function updatePromptOnly(g, warns) {
    var p = document.getElementById("gd-prompt"); if (!p) return;
    p.innerHTML = wzHtml(g);
    if (warns) document.getElementById("gd-warn").innerHTML = warns.length ? '<div class="warn">' + warns.join("<br>") + "</div>" : "";
  }
  document.getElementById("own-go").addEventListener("click", function () { if ((state.src || "").trim()) goStep("b3"); else document.getElementById("own-src").focus(); });
  document.getElementById("own-src").addEventListener("input", function (e) {
    state.src = e.target.value; renderSources(); renderBank(); updateStepStates();
  });

  /* ---------- Phóng to để đọc ---------- */
  var reader = document.getElementById("reader"), readerBody = document.getElementById("reader-body"), readerSrc = null, rfs = 19;
  function openReader(title, opts) {
    document.getElementById("reader-title").textContent = title;
    readerBody.innerHTML = ""; readerSrc = null;
    if (opts.textarea) {
      readerSrc = opts.textarea;
      var ta = document.createElement("textarea"); ta.value = opts.textarea.value; ta.placeholder = opts.textarea.placeholder || "";
      ta.addEventListener("input", function () { readerSrc.value = ta.value; readerSrc.dispatchEvent(new Event("input", { bubbles: true })); });
      readerBody.style.whiteSpace = "normal"; readerBody.appendChild(ta);
      setTimeout(function () { ta.focus(); }, 50);
    } else { readerBody.style.whiteSpace = "pre-wrap"; readerBody.innerHTML = opts.html; }
    if (typeof reader.showModal === "function") reader.showModal(); else reader.setAttribute("open", "");
  }
  function closeReader() { if (typeof reader.close === "function") reader.close(); else reader.removeAttribute("open"); }
  document.getElementById("reader-close").addEventListener("click", closeReader);
  reader.addEventListener("click", function (e) { if (e.target === reader) closeReader(); });
  function setRfs(v) { rfs = Math.max(15, Math.min(28, v)); reader.style.setProperty("--rfs", rfs + "px"); }
  document.getElementById("reader-bigger").addEventListener("click", function () { setRfs(rfs + 2); });
  document.getElementById("reader-smaller").addEventListener("click", function () { setRfs(rfs - 2); });
  function expandBar(onClick) {
    var bar = document.createElement("div"); bar.className = "exp-bar";
    var b = document.createElement("button"); b.type = "button"; b.className = "exp-btn"; b.textContent = "⤢ Phóng to";
    b.addEventListener("click", onClick); bar.appendChild(b); return bar;
  }
  [["own-src", "Đoạn tư liệu của em"]].forEach(function (p) {
    var ta = document.getElementById(p[0]);
    ta.parentNode.insertBefore(expandBar(function () { openReader(p[1], { textarea: ta }); }), ta);
  });

  /* ---------- Bước 4: 3 câu tự hỏi ---------- */
  var QC = ["Em đã tự nghĩ câu trả lời trước khi đọc câu trả lời của AI?", "Em đã tra lại tên người, năm tháng quan trọng trong sách giáo khoa?", "Kết luận cuối cùng là do em tự viết bằng lời của mình?"];
  var qcAns = [null, null, null], qcEl = document.getElementById("qc");
  QC.forEach(function (q, i) {
    var row = document.createElement("div"); row.className = "qc-row";
    row.innerHTML = "<span>" + esc(q) + '</span><span class="yn"><button type="button" class="y" aria-pressed="false" id="qc' + i + 'y">Có</button><button type="button" class="n" aria-pressed="false" id="qc' + i + 'n">Chưa</button></span>';
    qcEl.appendChild(row);
    ["y", "n"].forEach(function (v) {
      document.getElementById("qc" + i + v).addEventListener("click", function () {
        qcAns[i] = v;
        document.getElementById("qc" + i + "y").setAttribute("aria-pressed", v === "y" ? "true" : "false");
        document.getElementById("qc" + i + "n").setAttribute("aria-pressed", v === "n" ? "true" : "false");
        var vEl = document.getElementById("qc-verdict");
        if (qcAns.indexOf(null) >= 0) { vEl.textContent = "Trả lời đủ 3 câu nhé."; vEl.style.color = "var(--ink-2)"; return; }
        var no = qcAns.filter(function (a) { return a === "n"; }).length;
        vEl.textContent = no === 0 ? "Tốt lắm! Em đã dùng AI đúng cách." : qcAns[1] === "n" ? "Mở sách giáo khoa tra lại tên người, năm tháng trước khi dùng nhé." : "Còn " + no + " câu \"Chưa\". Hãy tự nghĩ và tự viết kết luận trước khi nộp bài.";
        vEl.style.color = no === 0 ? "var(--good)" : "var(--ink)";
      });
    });
  });

  /* ---------- Bước 4: khai báo dùng AI ---------- */
  function declText() {
    var tool = document.getElementById("d-tool").value;
    var pur = wz.goal ? DECL_PURPOSE[wz.goal] : "học bài";
    var topic = state.topic ? " bài " + state.topic.replace(/^Bài \d+\.\s*/, "") : "";
    var chk = document.getElementById("d-check").value.trim() || "sách giáo khoa Lịch sử " + state.grade;
    return "Khai báo sử dụng AI: Khi học" + topic + ", em đã dùng " + tool + " để " + pur + ". Các thông tin AI đưa ra đã được em kiểm tra lại trong " + chk + ". Phần kết luận và nội dung bài làm do em tự viết.";
  }
  function updDecl() { var o = document.getElementById("d-out"); if (o) o.textContent = declText(); }
  ["d-tool", "d-check"].forEach(function (id) { var el = document.getElementById(id); el.addEventListener("input", updDecl); el.addEventListener("change", updDecl); });
  document.getElementById("d-copy").addEventListener("click", function () { copyText(declText(), document.getElementById("d-copied")); });

  /* ---------- Bộ chọn giao diện (Theme switcher) ---------- */
  var themePicker = document.getElementById("theme-picker");
  function applyTheme(t) {
    if (!t || t === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", t);
    }
  }
  var savedTheme = "default";
  try { savedTheme = localStorage.getItem("ph-theme") || "default"; } catch (e) {}
  applyTheme(savedTheme);
  if (themePicker) {
    themePicker.value = savedTheme;
    themePicker.addEventListener("change", function () {
      var val = this.value;
      applyTheme(val);
      try { localStorage.setItem("ph-theme", val); } catch (e) {}
    });
  }

  wzReady = true; renderSources(); renderWizard(false);
})();
