import {
  BarsOutlined,
  BellOutlined,
  ContactsOutlined,
  FileImageOutlined,
  FolderOutlined,
  HomeOutlined,
  PieChartOutlined,
  ProfileOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons"
import { lazy, Suspense } from "react"
import { Loading } from "src/components/Loading/Loading"
import { getFlatMap, getMap } from "src/utils/array"

const Home = lazy(() => import("src/pages/Home/index"))
const ChangePassword = lazy(() => import("src/pages/Profile/ChangePassword"))
const General = lazy(() => import("src/pages/Profile/General"))

const CategoryArticle = lazy(() => import("src/pages/Categories/Article"))
const CategoryBanner = lazy(() => import("src/pages/Categories/Banner"))
const CategoryProvince = lazy(() => import("src/pages/Categories/Province"))
const CategoryDistrict = lazy(() => import("src/pages/Categories/District"))
const CategoryWard = lazy(() => import("src/pages/Categories/Ward"))

const Project = lazy(() => import("src/pages/Project"))

interface Props {
  children?: any
  component?: any
}

const SuspenseWrapper = ({ children, component: Component }: Props) => (
  <Suspense fallback={<Loading />}>{children ?? <Component />}</Suspense>
)

const menu: IMenu[] = [
  {
    id: "home",
    path: "/admin/home",
    title: "Trang chủ",
    icon: <HomeOutlined />,
    component: () => <SuspenseWrapper component={Home} />
  },
  // {
  //   id: "profile",
  //   path: "/admin/profile",
  //   title: "Thông tin tài khoản",
  //   icon: <UserOutlined />,
  //   hide: true,
  //   children: [
  //     {
  //       id: "general",
  //       path: "/admin/profile/general",
  //       title: "Thông tin chung",
  //       component: () => <SuspenseWrapper component={General} />
  //     },
  //     {
  //       id: "change-password",
  //       path: "/admin/profile/change-password",
  //       title: "Đổi mật khẩu",
  //       component: () => <SuspenseWrapper component={ChangePassword} />
  //     }
  //   ]
  // },

  {
    id: "DM",
    title: "Quản lý danh mục",
    path: "/admin/category",
    icon: <BarsOutlined />,
    children: [
      {
        id: "DMTT_ACCEPT",
        path: "/admin/category/province",
        title: "Tỉnh/TP",
        component: () => <SuspenseWrapper component={CategoryProvince} />
      },
      {
        id: "DMQH_ACCEPT",
        path: "/admin/category/district",
        title: "Quận/Huyện",
        component: () => <SuspenseWrapper component={CategoryDistrict} />
      },
      {
        id: "DMPX_ACCEPT",
        path: "/admin/category/ward",
        title: "Xã/Phường",
        component: () => <SuspenseWrapper component={CategoryWard} />
      },
      // {
      //   id: "DMCSYT_ACCEPT",
      //   path: "/admin/category/facility",
      //   title: "Đơn vị y tế",
      //   component: () => <SuspenseWrapper component={CategoryFacility} />
      // },

      // {
      //   id: "DMCLV_ACCEPT",
      //   path: "/admin/category/worksession",
      //   title: "Ca làm việc",
      //   component: () => <SuspenseWrapper component={CategoryWorkSession} />
      // },
      // {
      //   id: "DMKG_ACCEPT",
      //   path: "/admin/category/worktime",
      //   title: "Khung giờ",
      //   component: () => <SuspenseWrapper component={CategoryWorkTime} />
      // },
      {
        id: "DMCM_ACCEPT",
        path: "/admin/category/article",
        title: "Chuyên mục",
        component: () => <SuspenseWrapper component={CategoryArticle} />
      },
      {
        id: "DMBP_ACCEPT",
        path: "/admin/category/banner",
        title: "Loại Banner/Popup",
        component: () => <SuspenseWrapper component={CategoryBanner} />
      }
    ]
  },
  // {
  //   id: "QLGK",
  //   path: "/admin/package",
  //   title: "Quản lý gói khám",
  //   icon: <ContainerOutlined />,
  //   children: [
  //     {
  //       id: "QLGK_ACCEPT",
  //       path: "/admin/package/package-list",
  //       title: "Gói khám",
  //       component: () => <SuspenseWrapper component={PackageList} />
  //     }
  //     // {
  //     //   id: "QLLGK__ACCEPT",
  //     //   path: "/admin/package/package-type",
  //     //   title: "Loại gói khám",
  //     //   component: () => <SuspenseWrapper component={PackageType} />
  //     // }
  //     // {
  //     //   id: "QLGKPN_ACCEPT",
  //     //   path: "/admin/package/package-partner",
  //     //   title: "Theo đối tác",
  //     //   component: () => <SuspenseWrapper component={PackagePartnerList} />
  //     // }
  //   ]
  // },
  // {
  //   id: "QLBN",
  //   path: "/admin/patient",
  //   title: "Quản lý khách hàng ",
  //   icon: <TeamOutlined />,
  //   component: () => <SuspenseWrapper component={Patient} />
  // },

  {
    id: "QLUD",
    title: "Quản lý ứng dụng",
    path: "/admin/project",
    icon: <FolderOutlined />,
    component: () => <SuspenseWrapper component={Project} />
  }
]

export const menuMap = getMap(menu)

export const menuFlat = getFlatMap(menu)

export default menu
