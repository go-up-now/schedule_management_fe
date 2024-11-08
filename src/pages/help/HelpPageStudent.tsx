import Container from "../../components/Container.tsx"
import React from "react";
import Accordion from "../../components/Accordion.tsx";
import TabPanel from "../../components/TabPanel.tsx";
import TitleHeader from "../../components/TitleHeader.tsx";

const HelpPageStudent = () => {
    const accordionItemsIT = [
        {
            title: 'Sinh viên không truy cập được vào AP bằng email',
            content: 'Sinh viên chụp lại màn hình báo lỗi khi vào email và gửi minh chứng đến P. DVSV hoặc đến P. DVSV để được hỗ trợ.'
        },
        {
            title: 'Sinh viên không truy cập được LMS bằng điện thoại di động',
            content: 'Sinh viên chụp lại màn hình báo lỗi khi vào LMS trên điện thoại gửi mail đến P.DVSV hoặc đến P. DVSV để được hỗ trợ.'
        },
        {
            title: 'Làm cách nào để lấy lại mật khẩu email',
            content: `Đối với email @fpt: SV có thể đến phòng DVSV để được bộ phận IT hỗ trợ. Nếu SV thôi học thì làm hoàn tất thủ tục NHTL để được mở lại tài khoản email.
                        Đối với email @gmail: SV nhấn "Quên mật khẩu" và tự khôi phục email cá nhân`
        },
        {
            title: 'Cách sử dụng Mail, AP, CMS, LMS, EOS',
            content: `Trong buổi Định hướng các bạn Sinh viên sẽ được hướng dẫn sử dụng Mail, AP. CMS, LMS sẽ được hướng dẫn trong buổi học đầu tiên. 
                         Trong quá trình học tập, các bạn có thắc mắc hoặc gặp sự cố sẽ được Cán bộ IT tại cơ sở hỗ trợ xử lý.`
        },
        {
            title: 'Bài tập trên LMS không ghi nhận điểm, sinh viên phải làm sao?',
            content: `Sinh viên kiểm tra lại lớp làm bài tập đã đúng lớp của mình chưa.
                    Nếu Sinh viên làm bài tập đúng lớp mà không được ghi nhận điểm có thể chụp màn hình gửi mail đến phòng DVSV hoặc trực tiếp đến phòng DVSV để được hỗ trợ/tư vấn.`
        },
    ];

    const accordionItemsNewStudent = [
        {
            title: 'Sinh viên muốn đăng ký lớp học',
            content: 'Trước khi học kỳ bắt đầu sinh viên có thể đăng ký lớp học trên tool tại AP (Thời gian đăng ký: sẽ có thông báo thời gian đăng ký cụ thể trên Thông báo và tin tức phần Thông tin học tập "Thông báo thời gian đăng ký lớp học").'
        },
        {
            title: 'Sinh viên không vào/ quên mật khẩu LMS/CMS',
            content: `Sinh viên liên hệ hotline phòng DVSV để được hỗ trợ  
                        Sinh viên gửi email đến phòng DVSV để được hỗ trợ. 
                        Sinh viên có thể đến trực tiếp P.DVSV để được bộ phận IT hỗ trợ kiểm tra.`
        },
        {
            title: 'Sinh viên chưa biết xem lịch học thế nào',
            content: `Cách 1: Sinh viên tải App myFPL đăng nhập bằng email nhà trường cung cấp => vào phần xem lịch học 
                    Cách 2: Sinh viên đăng nhập Ap vào phần Lịch học - chọn lịch học 7 - 30 - 60 - 90 ngày tới để xem lịch. 
                    Cách 3: Nếu gặp vấn đề chưa đăng nhập được SV có thể gọi điện đến Hotline DVSV để được cán bộ hỗ trợ tra cứu lịch học.`
        },
        {
            title: 'Nếu sinh viên có việc phải nghỉ 1-2 buổi đầu thì sinh viên có bị kỷ luật không?',
            content: `Sinh viên có 20% buổi học được phép nghỉ nếu có việc riêng/ốm đau nhẹ,…, nếu quá số buổi học cho phép SV sẽ bị cấm thi, trường sẽ chỉ nhắc nhở và không kỷ luật khi SV nghỉ một vài buổi học. 
                    SV có thể liên hệ thêm với GV để nhờ GV cung cấp thêm kiến thức các buổi đã nghỉ để theo kịp chương trình, đảm bảo kiến thức môn học.`
        },
        {
            title: 'SV đã học võ, TA, GDQP ở Đại học FPT thì SV có thể được miễn giảm các môn này không?',
            content: `Theo quy định SV nếu học tại Đại học FPT có thể nộp bảng điểm để xin miễn giảm TA, Vovinam.
                    Sinh viên nộp chứng chỉ GDQP để được miễn giảm.
                    Sinh viên đăng ký miễn giảm môn học tại Dịch vụ trực tuyến trên AP =>Đăng ký Miễn giảm học phần theo đúng thời gian thông báo quy định và nộp bản sao công chứng Bảng điểm/Chứng chỉ về Phòng DVSV.`
        },
        {
            title: 'Sinh viên bị sai thông tin trên LMS',
            content: `Sinh viên có thể kiểm tra thông tin cá nhân trên AP nếu thông tin AP trên chính xác là được, thông tin trên LMS không ảnh hưởng gì đến kết quả của SV nên không sao.`
        },
        {
            title: 'Sinh viên chưa có laptop, khi nào cần dùng laptop',
            content: `Sinh viên nên có laptop trước khi bắt đầu môn học để thuận tiện cho việc làm bài tập các môn học cũng như đăng nhập các hệ thống của trường.`
        },
        {
            title: 'Nếu không thi Tiếng anh đầu vào thì sẽ như thế nào? Thi không đạt thì như thế nào?',
            content: `Nếu Sinh viên không thi Tiếng Anh đầu vào hoặc thi mà không đạt thì sẽ học Tiếng Anh bắt đầu từ level 1.1`
        },
    ];

    const accordionItemsDVSV = [
        {
            title: 'Sinh viên muốn chuyển ngành',
            content: `Sinh viên có nguyện vọng chuyển ngành có thể đăng ký đơn Chuyển ngành tại Dịch vụ trực tuyến trên AP (đóng phí chuyển ngành 500.000).
                    Thời gian nhận chuyển ngành: Trước khi học kỳ mới bắt đầu (sẽ có thông báo cụ thể trên bảng tin AP mục Thông tin học tập).
                    Sinh viên thanh toán phí chuyển ngành bằng cách thanh toán qua cổng thanh toán DNG hoặc trừ số dư tại Ví khác (nếu đủ số dư).`
        },
        {
            title: 'Sinh viên có nguyện vọng thôi học cần làm gì?',
            content: `Sinh viên có nguyện vọng thôi học làm đơn "Đăng ký Thôi học" tại Dịch vụ trực tuyến trên AP. 
                    Sinh viên thôi học còn số dư sẽ làm đơn Rút học phí để rút số dư (liên hệ P.DVSV của cơ sở để được hỗ trợ). Lưu ý thời điểm được rút số dư sau khi quyết định thôi học được ban hành.`
        },
        {
            title: 'Thủ tục bảo lưu',
            content: `Sinh viên có nguyện vọng Bảo lưu có thể đăng ký đơn Bảo lưu tại Dịch vụ trực tuyến trên AP. 
                    Thời gian nhận Bảo lưu: Trước khi học kỳ mới bắt đầu (sẽ có thông báo cụ thể trên bảng tin AP mục Thông tin hoạt động). 
                    Chú ý: 
                    Sinh viên chỉ được Bảo lưu tối đã 2 kỳ không học gì, cuối mỗi kì đăng ký đơn 1 lần.
                    Một đơn Bảo lưu chỉ có giá trị 1 kỳ nên SV cần đóng HP/làm Bảo lưu kỳ tiếp theo.`
        },
        {
            title: 'Lấy bằng tốt nghiệp thì cần chuẩn bị những giấy tờ gì?',
            content: `Sinh viên trực tiếp nhận bằng mang theo CMT/CCCD/ Thẻ SV đến để nhận bằng. 
                    Sinh viên nhờ người lấy thay: cần giấy ủy quyền từ SV có xác nhận địa phương, bản photo CMT/CCCD của người nhận thay, thẻ SV/CMT/CCCD của SV.`
        },
        {
            title: 'Phụ huynh muốn có email để vào xem lịch học và điểm của sinh viên?',
            content: `Cách 1: Phụ huynh gọi đến số Hotline hoặc viết email đến phòng DVSV của cơ sở sinh viên đang theo học để được hỗ trợ và hướng dẫn.
                    Cách 2: Đăng nhập hệ thống Ap.poly.edu.vn và làm theo hướng dẫn.   `
        },
        {
            title: 'Sinh viên bị lỗi điểm danh, sinh viên cần làm gì để khôi phục điểm danh?',
            content: `Sinh viên có nguyện vọng xin điểm danh bù có thể đăng ký đơn xin khôi phục điểm danh (Thời hạn đăng ký khôi phục điểm danh là 02 ngày kể từ ngày buổi học diễn ra) ghi rõ lý do bị điểm danh vắng tại Dịch vụ trực tuyến trên AP.                              
                    Nếu sinh viên đã từng đăng kí đơn khôi phục điểm danh 1 lần/môn rồi thì sẽ viết email xin điểm danh bù gửi cho Phòng Đào tạo đồng thời cc thêm mail của giảng viên để xin xác nhận.                                                                                     -Sinh viên nếu không có mặt tại lớp học với bất cứ lý do gì đều không được khôi phục điểm danh. 
                    Chú ý: SV phải có mặt đúng giờ tại lớp ngày bị đánh vắng, lỗi do GV điểm danh nhầm/thiếu hoặc do lỗi hệ thống mới được xin khôi phục điểm danh.`
        },
        {
            title: 'Để nhận giấy xác nhận sinh viên, Bảng điểm thì sinh viên cần phải làm gì?',
            content: ` Sinh viên cần xin giấy XNSV/Bảng điểm có thể đăng ký "đơn XNSV/Bảng điểm " tại Dịch vụ trực tuyến trên AP (đóng phí xin XNSV là 20.000, bảng điểm là 100.000)
                    Sinh viên có thể thanh toán phí đăng ký XNSV/Bảng điểm bằng cách thanh toán qua cổng thanh toán DNG hoặc trừ số dư tại Ví khác (nếu số dư đủ)
                    Thời gian trả XNSV/Bảng điểm trong vòng 5-10 ngày (tuỳ cơ sở) kể từ ngày đăng ký không tính cuối tuần. Sinh viên có thể nhận giấy XNSV/Bảng điểm qua 2 cách: Nhận trực tiếp tại cơ sở học hoặc chuyển phát nhanh (SV tự chi trả phí).`
        },
        {
            title: 'Sinh viên mất thẻ sinh viên thì phải làm gì?',
            content: `Nếu SV đang học làm mất thẻ : 
                    B1: SV cần làm đơn " Đăng ký cấp lại thẻ" tại Dịch vụ trực tuyến trên AP 
                    B2: đóng phí làm lại thẻ 100.000/thẻ.  
                    Chú ý: Sinh viên có thể thanh toán phí làm thẻ sinh viên bằng cách thanh toán qua cổng thanh toán DNG hoặc trừ số dư tại Ví khác (nếu số dư đủ).`
        },
    ];

    const accordionItemsCTSV = [
        {
            title: 'Hình thức khen thưởng đối với sinh viên có thành tích học tập tốt?',
            content: `Hàng kỳ Nhà trường sẽ tổ chức Lễ tôn vinh Sinh viên tiêu biểu nằm trong TOP toàn trường.
                    Hình thức khen thưởng: Giấy khen + Tiền mặt.
                    Đối với sinh viên đạt điểm 8.0 trở lên nhưng không nằm trong TOP toàn trường sẽ được khen thưởng bằng hình thức giấy khen.`
        },
        {
            title: 'Sinh viên muốn tham gia/thành lập CLB ở trường thì phải làm sao?',
            content: `Nếu sinh viên có nguyện vọng hỗ trợ tìm Nhà trọ, sinh viên có thể liên hệ trực tiếp tại phòng DVSV hoặc theo email phòng DVSV cơ sở để được tư vấn hỗ trợ.`
        },
        {
            title: 'Để được miễn giảm GDQP thì sinh viên cần phải làm gì?',
            content: `Đối tượng được miễn giảm GDQP: 
                    Các bạn sinh viên đã hoàn thành khóa học GDQP và có chứng chỉ tại các trường Cao đẳng, Đại học.
                    Sinh viên đăng ký và nộp đơn miễn giảm GDQP trên hệ thống DVTT.`
        },
        {
            title: 'Sinh viên đi nghĩa vụ quân sự về rồi thì có được miễn học GDQP tại trường không?',
            content: `SV đi nghĩa vụ quân sự về sẽ được miễn phần lý thuyết và vẫn phải học thực hành môn GDQP.`
        },
        {
            title: 'Phụ huynh muốn có email để vào xem lịch học và điểm của sinh viên?',
            content: `Cách 1: Phụ huynh gọi đến số Hotline hoặc viết email đến phòng DVSV của cơ sở sinh viên đang theo học để được hỗ trợ và hướng dẫn.
                    Cách 2: Đăng nhập hệ thống Ap.poly.edu.vn và làm theo hướng dẫn.   `
        },
        {
            title: 'GDQP có những đợt nào? Đi học GDQP ở đâu? Thời gian bao lâu? Làm thế nào để hoãn GDQP?',
            content: `Các đợt quân sự của Nhà trường thường được tổ chức ít nhất 01đợt/năm 
                    Nếu SV thuộc diện sinh viên tham gia học GDQP của từng đợt, P.CTSV sẽ gửi mail hướng dẫn thủ tục, địa điểm, thời gian học cụ thể cho sinh viên. 
                    Sinh viên chỉ hoãn GDQP trong trường hợp bất khá khảng và phải có minh chứng về việc nộp về phòng CTSV kèm đơn xin tạm hoãn học GDQP.`
        }
    ];

    const CourseRegistrationTabs = [
        {
            id: "1",
            label: "IT",
            content: (
                <>
                    <Accordion
                        items={accordionItemsIT}
                    />

                </>
            )
        },
        {
            id: "2",
            label: "SV mới nhập học",
            content: (
                <>
                    <Accordion
                        items={accordionItemsNewStudent}
                    />

                </>
            )
        },
        {
            id: "3",
            label: "DVSV",
            content: (
                <>
                    <Accordion
                        items={accordionItemsDVSV}
                    />

                </>
            )
        },
        {
            id: "4",
            label: "CTSV",
            content: (
                <>
                    <Accordion
                        items={accordionItemsCTSV}
                    />

                </>
            )
        }
    ]

    return (
        <Container>
            <TitleHeader title="HỖ TRỢ" />
            <div className="w-full bg-white p-4 shadow-md rounded-2xl">

                <TabPanel
                    tabs={CourseRegistrationTabs}
                    activeClassName="text-black border-blue-500 border-b-2"
                    inactiveClassName="text-gray-500 hover:text-gray-600 hover:border-gray-300"
                >
                </TabPanel>
            </div>
        </Container>
    )
}

export default HelpPageStudent;