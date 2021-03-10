cmake_minimum_required(VERSION 3.15.0 FATAL_ERROR)

set(CMAKE_SYSTEM_VERSION 10.0 CACHE STRING "" FORCE)

project(UAFWin_vs2013 CXX)

################################################################################
# Set target arch type if empty. Visual studio solution generator provides it.
################################################################################
if(NOT CMAKE_VS_PLATFORM_NAME)
    set(CMAKE_VS_PLATFORM_NAME "Win32")
endif()
message("${CMAKE_VS_PLATFORM_NAME} architecture in use")

if(NOT ("${CMAKE_VS_PLATFORM_NAME}" STREQUAL "Win32"))
    message(FATAL_ERROR "${CMAKE_VS_PLATFORM_NAME} arch is not supported!")
endif()

################################################################################
# Global configuration types
################################################################################
set(CMAKE_CONFIGURATION_TYPES
    "Debug"
    "Release"
    CACHE STRING "" FORCE
)

################################################################################
# Global compiler options
################################################################################
if(MSVC)
    # remove default flags provided with CMake for MSVC
    set(CMAKE_CXX_FLAGS "")
    set(CMAKE_CXX_FLAGS_DEBUG "")
    set(CMAKE_CXX_FLAGS_RELEASE "")
endif()

################################################################################
# Global linker options
################################################################################
if(MSVC)
    # remove default flags provided with CMake for MSVC
    set(CMAKE_EXE_LINKER_FLAGS "")
    set(CMAKE_MODULE_LINKER_FLAGS "")
    set(CMAKE_SHARED_LINKER_FLAGS "")
    set(CMAKE_STATIC_LINKER_FLAGS "")
    set(CMAKE_EXE_LINKER_FLAGS_DEBUG "${CMAKE_EXE_LINKER_FLAGS}")
    set(CMAKE_MODULE_LINKER_FLAGS_DEBUG "${CMAKE_MODULE_LINKER_FLAGS}")
    set(CMAKE_SHARED_LINKER_FLAGS_DEBUG "${CMAKE_SHARED_LINKER_FLAGS}")
    set(CMAKE_STATIC_LINKER_FLAGS_DEBUG "${CMAKE_STATIC_LINKER_FLAGS}")
    set(CMAKE_EXE_LINKER_FLAGS_RELEASE "${CMAKE_EXE_LINKER_FLAGS}")
    set(CMAKE_MODULE_LINKER_FLAGS_RELEASE "${CMAKE_MODULE_LINKER_FLAGS}")
    set(CMAKE_SHARED_LINKER_FLAGS_RELEASE "${CMAKE_SHARED_LINKER_FLAGS}")
    set(CMAKE_STATIC_LINKER_FLAGS_RELEASE "${CMAKE_STATIC_LINKER_FLAGS}")
endif()

################################################################################
# Nuget packages function stub.
################################################################################
function(use_package TARGET PACKAGE VERSION)
    message(WARNING "No implementation of use_package. Create yours. "
                    "Package \"${PACKAGE}\" with version \"${VERSION}\" "
                    "for target \"${TARGET}\" is ignored!")
endfunction()

################################################################################
# Common utils
################################################################################
include(CMake/Utils.cmake)

################################################################################
# Additional Global Settings(add specific info there)
################################################################################
include(CMake/GlobalSettingsInclude.cmake OPTIONAL)

################################################################################
# Use solution folders feature
################################################################################
set_property(GLOBAL PROPERTY USE_FOLDERS ON)

################################################################################
# Sub-projects
################################################################################



























set(PROJECT_NAME UAFWin)

################################################################################
# Source groups
################################################################################
set(no_group_source_files
    "cursor1.cur"
    "cursor2.cur"
)
source_group("" FILES ${no_group_source_files})

set(Header_Files
    "../Shared/ASL.h"
    "../Shared/bass.h"
    "../Shared/Char.h"
    "../Shared/class.h"
    "../Shared/ConfigFile.h"
    "../Shared/Externs.h"
    "../Shared/FileParse.h"
    "../Shared/GameEvent.h"
    "../Shared/GameRules.h"
    "../Shared/GlobalData.h"
    "../Shared/GPDLcomp.h"
    "../Shared/GPDLexec.h"
    "../Shared/GPDLOpCodes.h"
    "../Shared/Graphics.h"
    "../Shared/Items.h"
    "../Shared/Level.h"
    "../Shared/MessageMap.h"
    "../Shared/Money.h"
    "../Shared/Monster.h"
    "../Shared/Party.h"
    "../Shared/PicData.h"
    "../Shared/PicSlot.h"
    "../Shared/Property.h"
    "../Shared/ramfile.h"
    "../Shared/regexp.h"
    "../Shared/RunTimeIF.h"
    "../Shared/SharedQueue.h"
    "../Shared/SoundMgr.h"
    "../Shared/Specab.h"
    "../Shared/Spell.h"
    "../Shared/Stackwalker.h"
    "../Shared/stdafx.h"
    "../Shared/SurfaceMgr.h"
    "../Shared/Taglist.h"
    "../Shared/Thread.h"
    "../Shared/Timer.h"
    "../Shared/traits.h"
    "../Shared/Viewport.h"
    "../Shared/zconf.h"
    "../Shared/zlib.h"
    "../UAFWinEd/ImportWarning.h"
    "CDXBitmapFont.h"
    "CharStatsForm.h"
    "Combatant.h"
    "Combatants.h"
    "CProcinp.h"
    "Dgngame.h"
    "Disptext.h"
    "Drawtile.h"
    "Dungeon.h"
    "FormattedText.h"
    "GameMenu.h"
    "Getinput.h"
    "ItemsForm.h"
    "Mainfrm.h"
    "MouseThread.h"
    "ObjectScripts.h"
    "path.h"
    "resource.h"
    "RestTimeForm.h"
    "Screen.h"
    "SpellForm.h"
    "TextForm.h"
    "Treas.h"
    "XBrowseForFolder.h"
)
source_group("Header Files" FILES ${Header_Files})

set(Source_Files
    "../Shared/ASL.cpp"
    "../Shared/Char.cpp"
    "../Shared/class.cpp"
    "../Shared/ConfigFile.cpp"
    "../Shared/FileParse.cpp"
    "../Shared/GameEvent.cpp"
    "../Shared/GameRules.cpp"
    "../Shared/GlobalData.cpp"
    "../Shared/Globals.cpp"
    "../Shared/GPDLcomp.cpp"
    "../Shared/GPDLexec.cpp"
    "../Shared/Graphics.cpp"
    "../Shared/Items.cpp"
    "../Shared/Level.cpp"
    "../Shared/MessageMap.cpp"
    "../Shared/Money.cpp"
    "../Shared/Monster.cpp"
    "../Shared/Movie.cpp"
    "../Shared/Party.cpp"
    "../Shared/PicData.cpp"
    "../Shared/PicSlot.cpp"
    "../Shared/Property.cpp"
    "../Shared/ramfile.cpp"
    "../Shared/regexp.cpp"
    "../Shared/RunTimeIF.cpp"
    "../Shared/SoundMgr.cpp"
    "../Shared/Specab.cpp"
    "../Shared/Spell.cpp"
    "../Shared/Stackwalker.cpp"
    "../Shared/taglist.cpp"
    "../Shared/Timer.cpp"
    "../Shared/traits.cpp"
    "../Shared/Viewport.cpp"
    "../UAFWinEd/ImportWarning.cpp"
    "CDXBitmapFont.cpp"
    "CharStatsForm.cpp"
    "Combatant.cpp"
    "Combatants.cpp"
    "CProcinp.cpp"
    "Dgngame.cpp"
    "Disptext.cpp"
    "Drawtile.cpp"
    "Dungeon.cpp"
    "FormattedText.cpp"
    "Forth.cpp"
    "GameMenu.cpp"
    "Getinput.cpp"
    "ItemsForm.cpp"
    "Mainfrm.cpp"
    "MouseThread.cpp"
    "ObjectScripts.cpp"
    "path.cpp"
    "RestTimeForm.cpp"
    "RunEvent.cpp"
    "Screen.cpp"
    "SpellForm.cpp"
    "TextForm.cpp"
    "Treas.cpp"
    "XBrowseForFolder.cpp"
)
source_group("Source Files" FILES ${Source_Files})

set(ALL_FILES
    ${no_group_source_files}
    ${Header_Files}
    ${Source_Files}
)

################################################################################
# Target
################################################################################
add_executable(${PROJECT_NAME} ${ALL_FILES})

use_props(${PROJECT_NAME} "${CMAKE_CONFIGURATION_TYPES}" "${DEFAULT_CXX_PROPS}")
set_target_properties(${PROJECT_NAME} PROPERTIES
    VS_GLOBAL_KEYWORD "MFCProj"
)
################################################################################
# Target name
################################################################################
set_target_properties(${PROJECT_NAME} PROPERTIES
    TARGET_NAME_DEBUG   "UAFWin"
    TARGET_NAME_RELEASE "DC"
)
################################################################################
# Output directory
################################################################################
set_target_properties(${PROJECT_NAME} PROPERTIES
    OUTPUT_DIRECTORY_DEBUG   "${CMAKE_CURRENT_SOURCE_DIR}/./Debug"
    OUTPUT_DIRECTORY_RELEASE "${CMAKE_CURRENT_SOURCE_DIR}/./Release"
)
set_target_properties(${PROJECT_NAME} PROPERTIES
    PDB_OUTPUT_DIRECTORY_DEBUG   "${CMAKE_CURRENT_SOURCE_DIR}/./Debug"
    PDB_OUTPUT_DIRECTORY_RELEASE "${CMAKE_CURRENT_SOURCE_DIR}/./Release"
)
################################################################################
# MSVC runtime library
################################################################################
get_property(MSVC_RUNTIME_LIBRARY_DEFAULT TARGET ${PROJECT_NAME} PROPERTY MSVC_RUNTIME_LIBRARY)
string(CONCAT "MSVC_RUNTIME_LIBRARY_STR"
    $<$<CONFIG:Debug>:
        MultiThreadedDebug
    >
    $<$<CONFIG:Release>:
        MultiThreaded
    >
    $<$<NOT:$<OR:$<CONFIG:Debug>,$<CONFIG:Release>>>:${MSVC_RUNTIME_LIBRARY_DEFAULT}>
)
set_target_properties(${PROJECT_NAME} PROPERTIES MSVC_RUNTIME_LIBRARY ${MSVC_RUNTIME_LIBRARY_STR})

################################################################################
# Include directories
################################################################################
target_include_directories(${PROJECT_NAME} PUBLIC
    "${CMAKE_CURRENT_SOURCE_DIR}/../shared;"
    "${CMAKE_CURRENT_SOURCE_DIR}/../cdx"
)

################################################################################
# Compile definitions
################################################################################
target_compile_definitions(${PROJECT_NAME} PRIVATE
    "$<$<CONFIG:Debug>:"
        "_DEBUG;"
        "TRACE_TIMER_DETAILS;"
        "TASKTRACE;"
        "SpellMana"
    ">"
    "$<$<CONFIG:Release>:"
        "NDEBUG;"
        "xTASKTRACE;"
        "xTRACE_TIMER_DETAILS"
    ">"
    "WIN32;"
    "_WINDOWS;"
    "UAFEngine;"
    "SpellInitiationScript;"
    "SIMPLE_STRUCTURE;"
    "WINVER=0x0501;"
    "_CRT_SECURE_NO_WARNINGS;"
    "NO_WARN_MBCS_MFC_DEPRECATION;"
    "_MBCS"
)

################################################################################
# Compile and link options
################################################################################
if(MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE
        $<$<CONFIG:Debug>:
            /Od;
            /RTC1;
            /Zi
        >
        $<$<CONFIG:Release>:
            /O1;
            /Ob1;
            /GF;
            ${DEFAULT_CXX_DEBUG_INFORMATION_FORMAT}
        >
        /Gy;
        /W4;
        ${DEFAULT_CXX_EXCEPTION_HANDLING}
    )
    target_link_options(${PROJECT_NAME} PRIVATE
        $<$<CONFIG:Debug>:
            /NODEFAULTLIB:LIBCMT.lib;
            /DEBUG;
            /FIXED:NO
        >
        $<$<CONFIG:Release>:
            /DEBUG:FULL
        >
        /NOLOGO;
        /MACHINE:X86;
        /SAFESEH:NO;
        /SUBSYSTEM:WINDOWS;
        /DYNAMICBASE:NO;
        /INCREMENTAL:NO
    )
endif()

################################################################################
# Post build events
################################################################################
add_custom_command_if(
    TARGET ${PROJECT_NAME}
    POST_BUILD
    COMMANDS
    COMMAND   $<CONFIG:Debug> md ..\\..\\UAFWin
    COMMAND   $<CONFIG:Debug> copy debug\\UAFWin.exe ..\\..\\UAFWin\\UAFWin.exe
    COMMAND $<CONFIG:Release> md ..\\..\\UAFWin
    COMMAND $<CONFIG:Release> copy release\\DC.exe ..\\..\\UAFWin\\UAFWin.exe
)

################################################################################
# Dependencies
################################################################################
set(ADDITIONAL_LIBRARY_DEPENDENCIES
    "$<$<CONFIG:Debug>:"
        "msvfw32;"
        "cdxd"
    ">"
    "$<$<CONFIG:Release>:"
        "vfw32;"
        "cdx"
    ">"
    "amstrmid;"
    "winmm;"
    "ddraw;"
    "dsound;"
    "dxguid;"
    "bass;"
    "zlibr"
)
target_link_libraries(${PROJECT_NAME} PRIVATE "${ADDITIONAL_LIBRARY_DEPENDENCIES}")

target_link_directories(${PROJECT_NAME} PRIVATE
    "$<$<CONFIG:Debug>:"
        "C:/Program Files %28x86%29/Windows Kits/10/Lib/10.0.19041.0/um/x86"
    ">"
    "$<$<CONFIG:Release>:"
        "C:/Program Files (x86)/Microsoft Visual Studio/2019/Community/VC/Tools/MSVC/14.27.29110/atlmfc/lib/x86;"
        "C:/Program Files (x86)/Microsoft Visual Studio/2019/Community/VC/Tools/MSVC/14.27.29110/lib/onecore/x86;"
        "C:/Program Files (x86)/Microsoft Visual Studio/2019/Community/VC/Tools/MSVC/14.27.29110/lib/x86;"
        "C:/Program Files (x86)/Windows Kits/10/Lib/10.0.19041.0/um/x86"
    ">"
    "${CMAKE_CURRENT_SOURCE_DIR}/../shared"
)

