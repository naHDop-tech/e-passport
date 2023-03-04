package responser

import (
	"net/http"
	"time"
)

type responser struct {
}

func NewResponser() Responser {
	return &responser{}
}

const (
	API_OK          ResponseCode = "code.100001"
	API_BAD_REQUEST ResponseCode = "code.100002"
	API_FAIL        ResponseCode = "code.100003"
	API_UNAUTH      ResponseCode = "code.100004"
	API_NOT_FOUND   ResponseCode = "code.100005"
)

var codeToMessageMap = map[ResponseCode]string{
	API_OK:          "ok",
	API_BAD_REQUEST: "bad request",
	API_FAIL:        "failed",
	API_UNAUTH:      "Unauthorized",
	API_NOT_FOUND:   "Resource not found",
}

var codeToStatusMap = map[ResponseCode]int{
	API_OK:          http.StatusOK,
	API_BAD_REQUEST: http.StatusBadRequest,
	API_FAIL:        http.StatusInternalServerError,
	API_UNAUTH:      http.StatusUnauthorized,
	API_NOT_FOUND:   http.StatusNotFound,
}

func (r *responser) New(data any, err error, code ResponseCode) (response Response) {
	response.Status = codeToStatusMap[code]
	response.Code = code

	response.Data = data
	response.Timestamp = time.Now()
	response.Message = codeToMessageMap[code]
	return
}
