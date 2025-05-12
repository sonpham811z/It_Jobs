import DOMPurify from 'dompurify';

export const capitalizerFisrtletter = (str) => {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
}

export const generatePlaceHolderCard = (column) => {
    return {
        _id: `${column._id}-placeholder`,
        boardId: column.boardId,
        title: `placeholder`,
        columnId: column._id,
        description: null, cover: null, memberIds: [], comments: [], attachments: [],
        FE_PlaceHolder: true
    }
}

// Kỹ thuật dùng css pointer-event để chặn user spam click tại bất kỳ chỗ nào có hành động click gọi api
// Đây là một kỹ thuật rất hay tận dụng Axios Interceptors và CSS Pointer-events để chỉ phải viết code xử lý một lần cho toàn bộ dự án
// Cách sử dụng: Với tất cả các link hoặc button mà có hành động gọi api thì thêm class "interceptor-loading" cho nó là xong.
export const interceptorLoadingElements = (calling) => {
    // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
    const elements = document.querySelectorAll('.interceptor-loading')
    for (let i = 0; i < elements.length; i++) {
      if (calling) {
        // Nếu đang trong thời gian chờ gọi API (calling === true) thì sẽ làm mờ phần tử và chặn click bằng css pointer-events
        elements[i].style.opacity = '0.5'
        elements[i].style.pointerEvents = 'none'
      } else {
        // Ngược lại thì trả về như ban đầu, không làm gì cả
        elements[i].style.opacity = 'initial'
        elements[i].style.pointerEvents = 'initial'
      }
    }
  }

export const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A'
    const date = new Date(dateInput)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0') // tháng tính từ 0
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}
  
export const formatText = (text) => {
  return text
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Viết hoa chữ cái đầu
    .join('-'); // Ghép lại bằng dấu "-"
}

export const sanitizeHTML = (htmlString) => {
  return DOMPurify.sanitize(htmlString, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'ul', 'ol', 'li',
    'span', 'b', 'i'
    ],
    ALLOWED_ATTR: [ 'target', 'rel'] // ❌ KHÔNG có 'style'
  });
}