package responser

import "fmt"

//default codes for all microservices
const (
	UNDEFINED     ErrorCode = "undefined"
	BAD_REQUEST   ErrorCode = "bad_request"
	UNAUTHORIZED  ErrorCode = "unauthorized"
	ACCESS_DENIED ErrorCode = "access_denied"
)

var errorCodeToMessageMap = map[ErrorCode]string{
	UNDEFINED:     "Unknown error",
	BAD_REQUEST:   "Bad request",
	UNAUTHORIZED:  "Unauthorized",
	ACCESS_DENIED: "Access denied",
}

type DpError struct {
	Message string    `json:"message"`
	Code    ErrorCode `json:"code"`
	Type    ErrorType `json:"-"`
}

func (m *DpError) Error() string {
	return m.Message
}

type ErrorType int

type ErrorCode string

const (
	ET_INTERNAL ErrorType = iota
	ET_BUSINESS
)

func NewDpError(code ErrorCode) *DpError {
	return &DpError{
		Message: errorCodeToMessageMap[code],
		Type:    ET_BUSINESS,
		Code:    code,
	}
}

func NewDpUndefinedError(err error) *DpError {
	if err == nil {
		return nil
	}
	return &DpError{
		Message: err.Error(),
		Type:    ET_INTERNAL,
		Code:    UNDEFINED,
	}
}

func NewDpMessagef(message string, a ...any) *DpError {
	return &DpError{
		Message: fmt.Sprintf(message, a...),
		Type:    ET_INTERNAL,
		Code:    UNDEFINED,
	}
}

func WrapError(err error) *DpError {
	if e, ok := err.(*DpError); ok {
		return e
	}

	return NewDpUndefinedError(err)
}
