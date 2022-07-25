export const parseString = (commentFromRequest: any): string => {
  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }
  return commentFromRequest
}

export const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }
  return dateFromRequest
}

export const isString = (string: string): boolean => {
  return typeof string === 'string'
}

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}
