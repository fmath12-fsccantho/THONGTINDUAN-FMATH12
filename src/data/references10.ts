export interface ReferenceItem {
  id: number;
  authors: string;
  year: number | string;
  title: string;
  publication: string;
  directUrl: string;
  backupUrl?: string;
  doi?: string;
  publisherType: 'Springer' | 'Wiley' | 'SAGE' | 'Harvard' | 'Government' | 'GoogleBooks' | 'OpenAccess' | 'AcademicPDF';
  notes: string;
  appliedInProject: string;
}

export const REFERENCES_10: ReferenceItem[] = [
  {
    id: 1,
    authors: 'Bộ Giáo dục và Đào tạo',
    year: 2018,
    title: 'Thông tư số 32/2018/TT-BGDĐT ngày 26/12/2018 ban hành Chương trình giáo dục phổ thông',
    publication: 'Cổng thông tin điện tử Bộ GD&ĐT & Thư viện Pháp luật',
    directUrl: 'https://thuvienphapluat.vn/van-ban/Giao-duc/Thong-tu-32-2018-TT-BGDDT-chuong-trinh-giao-duc-pho-thong-403953.aspx',
    backupUrl: 'https://moet.gov.vn/',
    publisherType: 'Government',
    notes: 'Văn bản pháp lý nền tảng quy định cấu trúc chương trình, chuẩn kiến thức kỹ năng Toán 12 và định dạng đề thi tốt nghiệp THPT mới.',
    appliedInProject: 'Định hình 100% khung chương trình 6 chuyên đề Toán 12 và cấu trúc 3 dạng thức trắc nghiệm mới trên FMATH12.'
  },
  {
    id: 2,
    authors: 'Brusilovsky, P., & Millán, E.',
    year: 2007,
    title: 'User models for adaptive hypermedia and adaptive educational systems',
    publication: 'The adaptive web: Methods and strategies of web personalization (pp. 3–53). Springer, Berlin, Heidelberg',
    directUrl: 'https://link.springer.com/chapter/10.1007/978-3-540-72079-9_1',
    doi: 'https://doi.org/10.1007/978-3-540-72079-9_1',
    publisherType: 'Springer',
    notes: 'Công trình kinh điển về mô hình hóa người học (User Modeling) và các hệ thống học tập thích ứng cá nhân hóa (Adaptive Educational Systems).',
    appliedInProject: 'Xây dựng thuật toán Adaptive Learning Engine và biểu đồ năng lực Radar Chart 6 chiều cá nhân hóa cho học sinh.'
  },
  {
    id: 3,
    authors: 'Cronbach, L. J.',
    year: 1951,
    title: 'Coefficient alpha and the internal structure of tests',
    publication: 'Psychometrika, 16(3), 297–334',
    directUrl: 'https://link.springer.com/article/10.1007/BF02310555',
    doi: 'https://doi.org/10.1007/BF02310555',
    publisherType: 'Springer',
    notes: 'Bài báo gốc đề xuất hệ số tin cậy Cronbach’s Alpha dùng để kiểm định độ tin cậy và tính nhất quán nội tại của các thang đo trắc lượng.',
    appliedInProject: 'Kiểm định độ tin cậy của thang đo khảo sát thực trạng (Alpha = 0.892) và khảo sát thực nghiệm 19 items (Alpha = 0.914).'
  },
  {
    id: 4,
    authors: 'Field, A.',
    year: 2018,
    title: 'Discovering statistics using IBM SPSS Statistics (5th ed.)',
    publication: 'SAGE Publications',
    directUrl: 'https://us.sagepub.com/en-us/nam/discovering-statistics-using-ibm-spss-statistics/book258102',
    publisherType: 'SAGE',
    notes: 'Giáo trình chuẩn mực quốc tế về phương pháp phân tích thống kê thực nghiệm, kiểm định Independent-Samples T-Test, Paired T-Test và Effect Size (Cohen’s d).',
    appliedInProject: 'Thực hiện phân tích kiểm định T-test đối chứng giữa Nhóm Thực nghiệm (EG) và Nhóm Đối chứng (CG) sau 6 tuần.'
  },
  {
    id: 5,
    authors: 'Knowles, M. S.',
    year: 1975,
    title: 'Self-directed learning: A guide for learners and teachers',
    publication: 'Association Press / Cambridge Adult Education',
    directUrl: 'https://books.google.com/books/about/Self_directed_Learning.html?id=lqO0AAAAIAAJ',
    publisherType: 'GoogleBooks',
    notes: 'Tác phẩm kinh điển đặt nền móng lý thuyết cho phương pháp học tập tự định hướng (Self-Directed Learning - SDL).',
    appliedInProject: 'Thiết kế luồng học tập chủ động trên FMATH12, giúp học sinh tự lập kế hoạch ôn tập, tự kiểm tra và làm chủ tiến độ học Toán.'
  },
  {
    id: 6,
    authors: 'Likert, R.',
    year: 1932,
    title: 'A technique for the measurement of attitudes',
    publication: 'Archives of Psychology, 22(140), 1–55',
    directUrl: 'https://legacy.voteview.com/pdf/Likert_1932.pdf',
    publisherType: 'AcademicPDF',
    notes: 'Nghiên cứu nguyên bản phát minh ra thang đo Likert (1 - 5 mức độ), tiêu chuẩn vàng toàn cầu trong đo lường thái độ và nhận thức.',
    appliedInProject: 'Thiết kế bảng hỏi phiếu khảo sát thực trạng và thực nghiệm trên thang đo 5 mức độ (Hoàn toàn không đồng ý đến Rất đồng ý).'
  },
  {
    id: 7,
    authors: 'Noesgaard, S. S., & Ørngreen, R.',
    year: 2015,
    title: 'The effectiveness of e-learning: An explorative and integrative review of the definitions, methodologies and factors that promote e-learning effectiveness',
    publication: 'The Electronic Journal of e-Learning, 13(4), 278–290',
    directUrl: 'https://academic-publishing.org/index.php/ejel/article/view/1723',
    backupUrl: 'https://eric.ed.gov/?id=EJ1062121',
    publisherType: 'OpenAccess',
    notes: 'Nghiên cứu tổng quan toàn diện về các nhân tố thúc đẩy hiệu quả học trực tuyến (E-Learning Effectiveness), bao gồm tính tương tác và phản hồi tức thời.',
    appliedInProject: 'Định hướng tích hợp bộ phản hồi tức thì và engine giải thích trực quan dưới 40ms để duy trì mức độ tập trung tối đa.'
  },
  {
    id: 8,
    authors: 'Nunnally, J. C., & Bernstein, I. H.',
    year: 1994,
    title: 'Psychometric theory (3rd ed.)',
    publication: 'McGraw-Hill, New York',
    directUrl: 'https://books.google.com/books/about/Psychometric_Theory.html?id=OEQoAQAAMAAJ',
    publisherType: 'GoogleBooks',
    notes: 'Tác phẩm tiêu chuẩn học thuật kinh điển về lý thuyết trắc lượng tâm lý, độ giá trị nội dung (content validity) và ngưỡng chấp nhận độ tin cậy thang đo (Alpha > 0.7).',
    appliedInProject: 'Quy chuẩn hóa toàn bộ thang đo đánh giá trong đề tài nghiên cứu đạt chuẩn khoa học quốc tế.'
  },
  {
    id: 9,
    authors: 'Vygotsky, L. S.',
    year: 1978,
    title: 'Mind in society: The development of higher psychological processes',
    publication: 'Harvard University Press',
    directUrl: 'https://www.hup.harvard.edu/books/9780674576292',
    publisherType: 'Harvard',
    notes: 'Tác phẩm nền tảng của Thuyết Kiến tạo xã hội (Social Constructivism) và khái niệm Vùng phát triển gần nhất (Zone of Proximal Development - ZPD).',
    appliedInProject: 'Cơ sở lý luận trung tâm của FMATH12: Định vị mức độ bài tập vừa sức trong vùng ZPD của từng học sinh, không quá khó gây nản, không quá dễ gây nhàm chán.'
  },
  {
    id: 10,
    authors: 'Wood, D., Bruner, J. S., & Ross, G.',
    year: 1976,
    title: 'The role of tutoring in problem solving',
    publication: 'Journal of Child Psychology and Psychiatry, 17(2), 89–100',
    directUrl: 'https://acamh.onlinelibrary.wiley.com/doi/10.1111/j.1469-7610.1976.tb00381.x',
    doi: 'https://doi.org/10.1111/j.1469-7610.1976.tb00381.x',
    publisherType: 'Wiley',
    notes: 'Công trình tiên phong khai sinh ra khái niệm Giàn giáo sư phạm (Scaffolding), phương pháp gia sư dẫn dắt từng bước giúp người học tự kiến tạo lời giải.',
    appliedInProject: 'Cốt lõi sư phạm của Chatbot AI FMATH12: Tuyệt đối không giải hộ, chỉ đặt câu hỏi gợi mở logic từng nấc thang tư duy.'
  }
];
