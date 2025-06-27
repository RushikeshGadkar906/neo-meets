import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  styled,
  Typography
} from '@mui/material'
import HrLine from '../HrLine/HrLine'
import DownArrow from '../DownArrow/DownArrow'
import { useAppDispatch, useAppSelector } from 'src/store'
import { setJobFilters } from 'src/slice/jobsSlice'
import SearchBox from '../CustomSearchBox/SearchBox'
import { useHeaderFooterVisibility } from 'src/@core/context/HeaderFooterContextVisibility'

const AccordianLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '12px !important'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '20px'
  }
}))

const AccordianData = styled(Accordion)(({ theme }) => ({
  '&.MuiAccordion-root': {
    border: 'none',
    boxShadow: 'none',
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiAccordionSummary-root': {
    padding: 0,
    minHeight: 'auto'
  },
  '& .MuiCollapse-wrapper': {
    padding: '0 !important'
  },
  '& .MuiAccordionDetails-root': {
    padding: '0px 5px'
  },
  '& .MuiAccordionSummary-content': {
    margin: 0
  }
}))

const SidebarFilter = ({ accordionData, onFiltersChange }: any) => {
  const { Location, Department, Company } = useAppSelector((state: any) => state.jobFilter)
  const jobFilter = useAppSelector((state: any) => state.jobFilter)
  const [selectedLocation, setSelectedLocation] = useState<any[]>(Location)
  const [selectedCompany, setSelectedCompany] = useState<any[]>(Company)
  const [selectedDepartment, setSelectedDepartment] = useState<any[]>(Department)
  const [expandedAccordions, setExpandedAccordions] = useState<number[]>([])
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const dispatch = useAppDispatch()
  const { searchValue, setSearchVisible } = useHeaderFooterVisibility()

  useEffect(() => {
    setSelectedCompany(Company)
    setSelectedDepartment(Department)
    setSelectedLocation(Location)
  }, [Location, Department, Company])

  const handleCheckboxChange = (category: string, value: any) => {
    let updatedSelection
    setSearchVisible({ location: null, jobTitle: null })
    switch (category) {
      case 'Location':
        updatedSelection = selectedLocation.includes(value)
          ? selectedLocation.filter((item: any) => item !== value)
          : [...selectedLocation, value]
        setSelectedLocation(updatedSelection)
        dispatch(
          setJobFilters({
            ...jobFilter,
            Location: updatedSelection,
            showSearchBar: false
          })
        )
        break
      case 'Company Type':
        updatedSelection = selectedCompany.includes(value)
          ? selectedCompany.filter((item: any) => item !== value)
          : [...selectedCompany, value]
        setSelectedCompany(updatedSelection)
        dispatch(
          setJobFilters({
            ...jobFilter,
            Company: updatedSelection,
            showSearchBar: false
          })
        )
        break
      case 'Department':
        updatedSelection = selectedDepartment.includes(value)
          ? selectedDepartment.filter((item: any) => item !== value)
          : [...selectedDepartment, value]
        setSelectedDepartment(updatedSelection)
        dispatch(
          setJobFilters({
            ...jobFilter,
            Department: updatedSelection,
            showSearchBar: false
          })
        )
        break
      default:
        break
    }

    onFiltersChange({
      Location: category === 'Location' ? updatedSelection : selectedLocation,
      Company: category === 'Company Type' ? updatedSelection : selectedCompany,
      Department: category === 'Department' ? updatedSelection : selectedDepartment
    })
  }

  const handleClearAll = () => {
    setSelectedLocation([])
    setSelectedCompany([])
    setSelectedDepartment([])
    setSearchTerms(Array(accordionData.length).fill(''))
    onFiltersChange({
      Location: [],
      Company: [],
      Department: []
    })
    dispatch(
      setJobFilters({
        Location: [],
        Company: [],
        Department: []
      })
    )
  }

  const handleShowMoreToggle = (index: number) => {
    setExpandedAccordions(prev => (prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]))
  }

  const handleSearchChange = (index: number, value: string) => {
    const updatedSearchTerms = [...searchTerms]
    updatedSearchTerms[index] = value
    setSearchTerms(updatedSearchTerms)
  }

  const filterOptions = (options: any[], searchTerm: string) => {
    return options.filter(option => option.label.toLowerCase().includes(searchTerm?.toLowerCase()))
  }

  return (
    <Box>
      <Card className='borderCard' variant='outlined' sx={{ borderRadius: '10px', p: '16px 24px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant='subtitle1'>All Filters</Typography>
          <Button variant='outlined' color='primary' onClick={handleClearAll}>
            Clear All
          </Button>
        </Box>
        <HrLine />
        <Box>
          {accordionData.map((accordion: any, index: any) => (
            <React.Fragment key={index}>
              <AccordianData defaultExpanded sx={{ p: 0 }}>
                <AccordionSummary
                  expandIcon={<DownArrow />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography variant='subtitle2'>{accordion.title}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ display: 'flex', flexDirection: 'column' }}>
                  {accordion.showSearchBox && (
                    <Box sx={{ mb: 2 }}>
                      <SearchBox
                        placeHolderTitle={`Search ${accordion.title}`}
                        searchText={searchTerms[index] || ''}
                        handleInputChange={e => handleSearchChange(index, e.target.value)}
                        handleClearSearch={() => handleSearchChange(index, '')}
                      />
                    </Box>
                  )}
                  {(expandedAccordions.includes(index)
                    ? searchTerms[index]?.trim()
                      ? filterOptions(accordion.options, searchTerms[index])
                      : accordion.options
                    : searchTerms[index]?.trim()
                    ? filterOptions(accordion.options, searchTerms[index]).slice(0, 4)
                    : accordion.options.slice(0, 4)
                  ).map((option: any, idx: any) => (
                    <AccordianLabel
                      key={idx}
                      control={
                        <Checkbox
                          checked={
                            accordion.title === 'Location'
                              ? selectedLocation.includes(option.value)
                              : accordion.title === 'Company Type'
                              ? selectedCompany.includes(option.value)
                              : selectedDepartment.includes(option.value)
                          }
                          onChange={() => handleCheckboxChange(accordion.title, option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                  {accordion.options.length > 4 && !searchTerms[index]?.trim() && (
                    <Box>
                      <Button variant='text' color='primary' onClick={() => handleShowMoreToggle(index)}>
                        {expandedAccordions.includes(index) ? 'Show Less' : `+${accordion.options.length - 4} More`}
                      </Button>
                    </Box>
                  )}
                </AccordionDetails>
              </AccordianData>
              <HrLine />
            </React.Fragment>
          ))}
        </Box>
      </Card>
    </Box>
  )
}

export default SidebarFilter
